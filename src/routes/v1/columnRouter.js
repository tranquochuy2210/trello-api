const express = require('express')
const columnController = require ('*/controller/columnController')
const columnValidation = require('*/validations/columnValidation')
const router = express.Router()
router.post('/', columnValidation.createNew, columnController.createNew)
router.put('/:id', columnValidation.update, columnController.update)


module.exports = router