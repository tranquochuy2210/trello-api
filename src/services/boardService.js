const Board = require('*/models/boardModel')


const createNew = async (data) => {
    try {
        const result = await Board.createNew(data)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getFullBoard = async (id) => {
    try {
        const board = await Board.getFullBoard(id)
        if (!Object.keys(board).length) {
            throw new Error('cannot find board')
        }
        //delete cards
        delete board.cards
        return board
    } catch (error) {
        throw new Error(error.message)
    }
}
const update = async (id, data) => {
    try {
        const updateData={
            ...data,
            updatedAt: Date.now()
        }
        if (updateData._id) delete updateData._id
        if (updateData.columns) delete updateData.cards
        const result = await Board.update(id, updateData)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNew, getFullBoard, update }
