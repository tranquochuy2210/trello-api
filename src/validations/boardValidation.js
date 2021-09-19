const Joi = require('joi')


const createNew = async ( req, res, next ) => {
    const condition = Joi.object({
        title: Joi.string().required().min(3).max(20).trim()
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        res.status(400).json({
            errors: new Error(error).message
        })
    }
}

module.exports = { createNew }