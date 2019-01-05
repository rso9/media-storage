import path from 'path'
import mediaserver from 'mediaserver'
import HttpStatus from 'http-status-codes'
import axios from 'axios'

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

    const artistId = parseInt(req.body.artist)
    const songTitle = req.body.title

    w.log('info', 'UPLOAD SONG ENDPOINT', {songUploaded: req.file.originalname, markerName: 'ENTRY'})
    if (req.file.error) {
        w.log('error', 'UPLOAD SONG ENDPOINT', {songUploaded: req.file.originalname, markerName: 'EXIT', error: req.file.error})
        res.status(req.file.error.status).send(req.file.error)
    } else {
        const song = req.file.originalname;

        axios.post('http://localhost:8080/v1/song', {
            songName: songTitle,
            artists: [{id: artistId}],
            songUrl: '/song/' + song
        })
            .then(res => res.json())
            .then(response => console.log(response))
            .catch(err => {
                w.log('error', 'UPLOAD SONG ENDPOINT', {songUploaded: req.file.originalname, markerName: 'EXIT', error: err.response.data})
                res.status(500).send(err)
                res.end()
            })

        res.status(HttpStatus.OK)
    }
    w.log('info', 'UPLOAD SONG ENDPOINT', {songUploaded: req.file.originalname, markerName: 'EXIT'})
    res.end()
}

export default audioController
