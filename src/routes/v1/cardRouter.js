const express = require('express')
const cardController = require ('*/controller/cardController')
const cardValidation = require('*/validations/cardValidation')
const router = express.Router()

router.post('/', cardValidation.createNew, cardController.createNew)
router.put('/:id', cardValidation.update, cardController.update )

module.exports = router