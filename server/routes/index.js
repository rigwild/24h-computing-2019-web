'use strict'

import express from 'express'
import example from './example'
import exampleInsertDb from './exampleInsertDb'

const router = express.Router()

router.use('/example', example)
router.use('/exampleInsertDb', exampleInsertDb)

export default router
