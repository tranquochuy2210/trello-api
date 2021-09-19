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



module.exports = { createNew }