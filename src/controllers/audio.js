import path from 'path'
import mediaserver from 'mediaserver'
import HttpStatus from 'http-status-codes'
const w = require('winston')

const audioController = {}

audioController.serveSong = (req, res) => {
    w.log('info', 'SERVE SONG ENDPOINT', {songRequested: req.params.name, markerName: 'ENTRY'})
    const song = path.join(__dirname, '..', 'storage', 'audio', req.params.name)
    const pipe = mediaserver.pipe(req, res, song)

    if (!pipe) {
        w.log('error', 'SERVE SONG ENDPOINT', {songRequested: req.params.name, markerName: 'EXIT', error: 'File not found'})
    } else {
        w.log('info', 'SERVE SONG ENDPOINT', {songRequested: req.params.name, markerName: 'EXIT'})
    }

}

audioController.uploadSong = (req, res) => {
    w.log('info', 'UPLOAD SONG ENDPOINT', {songUploaded: req.file.originalname, markerName: 'ENTRY'})
    if (req.file.error) {
        w.log('error', 'UPLOAD SONG ENDPOINT', {songUploaded: req.file.originalname, markerName: 'EXIT', error: req.file.error})
        res.status(req.file.error.status).send(req.file.error)
    } else {
        const song = req.file.originalname;
        /* TODO: at this point, make a request to the catalog microservice,
        / which will store the location of the file and its filename for
        / every song in the application */
        res.status(HttpStatus.OK)
    }
    w.log('info', 'UPLOAD SONG ENDPOINT', {songUploaded: req.file.originalname, markerName: 'EXIT'})
    res.end()
}

export default audioController
