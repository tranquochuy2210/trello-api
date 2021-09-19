const Column = require('*/models/columnModel')
const Board =require('*/models/boardModel')
const createNew = async (data) => {
    try {
        const newColumn = await Column.createNew(data)
        //update columnOrder
        const boardId = newColumn.boardId.toString()
        const columnId = newColumn._id.toString()
        await Board.pushColumnOrders(boardId, columnId)
        return newColumn
    } catch (error) {
        console.log(error)
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
        //update colum
        return result
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


module.exports = { createNew, update }