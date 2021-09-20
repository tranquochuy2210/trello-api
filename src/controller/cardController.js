const cardService = require ('*/services/cardService')

const createNew = async (req, res) => {
    try {
        const result= await cardService.createNew(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({
            errors:error
        })
    }
}
const update = async (req, res) => {
    try {
        const { id } =req.params
        const updateData = req.body
        const result =await cardService.update(id, updateData)
        res.json(result)
    } catch (error) {
        res.status(500).json({
            errors:error
        })
    }
}



module.exports = { createNew, update}