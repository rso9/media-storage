import express from 'express'
import audioController from '../controllers/audio'
import upload from '../utils/multer/upload'
const KumuluzeeDiscovery = require('@kumuluz/kumuluzee-discovery').default

const router = express.Router()

// song routes
router.get('/song/:name', audioController.serveSong)
router.post('/song', upload.single('song'), audioController.uploadSong)
router.get('/test', async (req, res) => {
  internalURL = await KumuluzeeDiscovery.discoverService({
    value: "catalog",
    version: "1.0.0",
    environment: "dev",
    accessType: "DIRECT"
  })

  console.log(internalURL)
  res.json({oj})
})

export default router
