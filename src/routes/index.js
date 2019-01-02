import express from 'express'
import audioController from '../controllers/audio'
import upload from '../utils/multer/upload'

const router = express.Router()

// song routes
router.get('/song/:name', audioController.serveSong)
router.post('/song', upload.single('song'), audioController.uploadSong)

export default router