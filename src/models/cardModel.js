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
        console.log(error)
    }
}


module.exports = { createNew }
