const Joi = require('joi')
const { getDB } = require('*/config/mongodb')
const { ObjectId }= require('mongodb')


//define
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(20),
    cardOrder: Joi.array().items(Joi.string).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})
const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}
const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data)
        const insertValue = { ...validatedValue, boardId: ObjectId(validatedValue.boardId) }
        const res = await getDB().collection(columnCollectionName).insertOne(insertValue)
        const result =await getDB().collection(columnCollectionName).findOne({ _id: res.insertedId })
        return result
    } catch (error) {
        throw new Error(error)
    }
}
const pushCardToColumnOrder = async (columnId, cardId) => {
    try {
        await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(columnId) },
            { $push : { cardOrder: cardId } },
            { returnDocument: 'after' }
        )
    } catch (error) {
        throw new Error(error)
    }
}

const update =async (id, data) => {
    try {
        const updateData = { ... data }
        if (updateData._id) {delete updateData._id}
        if (updateData.cards) {delete updateData._cards}
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set : updateData },
            { returnDocument: 'after' }
        )
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNew, update, pushCardToColumnOrder }
