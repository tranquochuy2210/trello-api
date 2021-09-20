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
        console.log(board)
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

module.exports = { createNew, getFullBoard }
