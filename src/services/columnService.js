const Column = require('*/models/columnModel')
const Board =require('*/models/boardModel')
const Card =require('*/models/cardModel')
const createNew = async (data) => {
    try {
        const newColumn = await Column.createNew(data)
        newColumn.cards=[]
        //update columnOrder
        const boardId = newColumn.boardId.toString()
        const columnId = newColumn._id.toString()
        await Board.pushColumnOrders(boardId, columnId)
        return newColumn
    } catch (error) {
        throw new Error(error)
    }
}
const update = async (id, data) => {
    try {
        const updateData={
            ...data,
            updatedAt: Date.now()
        }
        const result = await Column.update(id, updateData)
        result.cards = await Card.getCards('columnId', result._id)
        //update column
        if (result._destroy) {
            const ids =result.cards.map ( card => card._id)
            await Card.deleteMany(ids)
        }
        return result
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = { createNew, update }