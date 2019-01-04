import path from 'path'
import mediaserver from 'mediaserver'
import HttpStatus from 'http-status-codes'
const w = require('winston')

const audioController = {}

audioController.serveSong = (req, res) => {
    w.log('info', 'ENTRY SERVE SONG ENDPOINT', {songRequested: req.params.name})
    const song = path.join(__dirname, '..', 'storage', 'audio', req.params.name)
    mediaserver.pipe(req, res, song)
    w.log('info', 'EXIT SERVE SONG ENDPOINT')
}

audioController.uploadSong = (req, res) => {
    w.log('info', 'ENTRY UPLOAD SONG ENDPOINT', {songUploaded: req.file.originalname})
    if (req.file.error) {
        w.log('error', 'EXIT UPLOAD SONG ENDPOINT')
        res.status(req.file.error.status).send(req.file.error)
    } else {
        const song = req.file.originalname;
        /* TODO: at this point, make a request to the catalog microservice,
        / which will store the location of the file and its filename for
        / every song in the application */
        res.status(HttpStatus.OK)
    }
    w.log('info', 'EXIT UPLOAD SONG ENDPOINT')
    res.end()
}

export default audioController