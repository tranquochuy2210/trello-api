const BoardService = require ('*/services/boardService')

const createNew = async (req, res) => {
    try {
        const result= await BoardService.createNew(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({
            errors:error
        })
    }
}
const getFullBoard = async (req, res) => {
    const { id } = req.params
    try {
        const result = await BoardService.getFullBoard(id)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: error
        })
    }
}


module.exports = { createNew, getFullBoard }