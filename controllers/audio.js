import path from 'path'
import mediaserver from 'mediaserver'
import HttpStatus from 'http-status-codes'

const audioController = {}

audioController.serveSong = (req, res) => {
    const song = path.join(__dirname, '..', 'storage', 'audio', req.params.name)
    mediaserver.pipe(req, res, song)
}

audioController.uploadSong = (req, res) => {
    if (req.file.error) {
        res.status(req.file.error.status).send(req.file.error)
    } else {
        const song = req.file.originalname;
        /* TODO: at this point, make a request to the catalog microservice,
        / which will store the location of the file and its filename for
        / every song in the application */
        res.status(HttpStatus.OK)
    }
    res.end()
}

export default audioController