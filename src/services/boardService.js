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
        board.columns.forEach(column => {
            column.cards = board.cards.filter(c => c.columnId.toString() === column._id.toString())
        })
        //delete cards
        delete board.cards
        return board
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { createNew, getFullBoard }
