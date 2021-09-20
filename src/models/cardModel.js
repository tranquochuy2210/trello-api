const Joi = require('joi')
const { getDB } = require('*/config/mongodb')
const { ObjectId } = require('mongodb')


//define
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
    title: Joi.string().required().min(3).max(50),
    cover: Joi.string().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})
const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}
const createNew = async (data) => {
    try {
        const validatedValue =await validateSchema(data)
        const insertValue = { ...validatedValue, columnId: ObjectId(validatedValue.columnId), boardId: ObjectId(validatedValue.boardId) }
        const response = await getDB().collection(cardCollectionName).insertOne(insertValue)
        const result = await getDB().collection(cardCollectionName).findOne({ _id: response.insertedId })
        return result
    } catch (error) {
        throw new Error(error.message)
    }
}
const getCards =async (field, value) => {
    try {
        if ( !['boardId', 'columnId'].includes(field)) {
            throw new Error('field not invalid')
        }
        const match = { _destroy : false }
        match [field] =value
        const result= await getDB().collection(cardCollectionName).find(match).toArray()
        return result
    } catch (error) {
        throw new Error(error.message)
    }
}

//id :array

const deleteMany = async (ids) => {
    try {
        const result = await getDB().collection(cardCollectionName).updateMany(
            { _id: { $in: ids } },
            { $set: { _destroy: true } }
        )
        return result.value
    } catch (error) {
        throw new Error(error.message)
    }
}

const update = async (id, data) => {
    try {
        const updateData = { ... data }
        if (updateData.boardId) updateData.boardId = ObjectId(updateData.boardId)
        if (updateData.columnId) updateData.columnId = ObjectId(updateData.columnId)
        const result = await getDB().collection(cardCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set : updateData },
            { returnDocument: 'after' }
        )
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNew, getCards, deleteMany, update }
