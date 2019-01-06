import express from 'express'
import audioController from '../controllers/audio'
import os from 'os'
import upload from '../utils/multer/upload'
const KumuluzeeDiscovery = require('@kumuluz/kumuluzee-discovery').default

const router = express.Router()

// song routes
router.get('/song/:name', audioController.serveSong)
router.post('/song', upload.single('song'), audioController.uploadSong)
router.get('/test', async (req, res) => {
  let internalURL = await KumuluzeeDiscovery.discoverService({
    value: "catalog",
    version: "1.0.0",
    environment: "dev",
    accessType: "DIRECT"
  })

  console.log(internalURL)
  res.status(200).json({internalURL})
})

router.get('/metrics', (req, res) => {
  res.status(200).json({
    cpuInfo: os.cpus(),
    cpuUsage: os.loadavg(),
    memoryUsage: os.freemem() / os.totalmem(),
    uptime: os.uptime()
  })
})

export default router
