const Card = require('*/models/cardModel')
const Column = require('*/models/columnModel')
const createNew = async (data) => {
    try {
        const result = await Card.createNew(data)
        const cardId = result._id.toString()
        const columnId = result.columnId.toString()
        await Column.pushCardToColumnOrder(columnId, cardId)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNew }