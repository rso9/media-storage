import express from 'express'
import audioController from '../controllers/audio.js'

const router = express.Router()

// keystroke routes
router.get('/song/:name', audioController.serveSong)

export default router