const express = require('express')
const boardRouter = require('./boardRouter')
const columnRouter = require('./columnRouter')
const cardRouter = require('./cardRouter')
const router = express.Router()

router.use('/board', boardRouter)
router.use('/column', columnRouter)
router.use('/card', cardRouter)

module.exports = router