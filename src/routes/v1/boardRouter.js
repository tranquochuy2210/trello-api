const express = require('express')
const BoardController = require ('*/controller/boardController')
const BoardValidation = require('*/validations/boardValidation')
const router = express.Router()
router.post('/', BoardValidation.createNew, BoardController.createNew)
router.get('/:id', BoardController.getFullBoard)
router.put('/:id', BoardValidation.update, BoardController.update)
module.exports = router