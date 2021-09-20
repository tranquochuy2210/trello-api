const boardService = require ('*/services/boardService')

const createNew = async (req, res) => {
    try {
        const result= await boardService.createNew(req.body)
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
        const result = await boardService.getFullBoard(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            errors: error
        })
    }
}
const update = async (req, res) => {
    try {
        const { id } = req.params
        const result = await boardService.update(id, req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            errors: error
        })
    }
}


module.exports = { createNew, getFullBoard, update}