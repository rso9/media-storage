import fs from 'fs'
import path from 'path'
import mediaserver from 'mediaserver'

const audioController = {}

audioController.serveSong = (req, res) => {
    const song = path.join(__dirname, '..', 'storage', 'audio', req.params.name)
    mediaserver.pipe(req, res, song)
}

export default audioController