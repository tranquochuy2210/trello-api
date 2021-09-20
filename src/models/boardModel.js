const Joi = require('joi')
const { getDB } = require('*/config/mongodb')
const { ObjectId } = require('mongodb')
const Card = require('./cardModel')
Joi.objectId = require('joi-objectid')(Joi)

const boardCollectionName = 'boards'

const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20),
    columnOrder: Joi.array().items(Joi.string).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})
const validateSchema = async (data) => {
    return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}
const createNew = async (data) => {
    try {
        const value =await validateSchema(data)
        const result = await getDB().collection(boardCollectionName).insertOne(value)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const pushColumnOrders = async (boardId, columnId) => {
    try {
        const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
            { _id: ObjectId(boardId) },
            { $push : { columnOrder: columnId } },
            { returnDocument: 'after' }
        )
        return result.value
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const getFullBoard = async (boardId) => {
    try {
        const data = await getDB().collection(boardCollectionName).aggregate([
            { $match: { _id: ObjectId(boardId), _destroy: false } },
            { $lookup:
                {
                    from: 'columns',
                    localField:'_id',
                    foreignField:'boardId',
                    as: 'columns'
                } }
        ]
        ).toArray()
        const result = data[0]
        if (!result) return {}

        result.columns = result.columns.filter(column => !column._destroy)
        for ( let column of result.columns) {
            column.cards = await Card.getCards ('columnId', column._id)
        }
        return result
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


module.exports = { createNew, getFullBoard, pushColumnOrders }
