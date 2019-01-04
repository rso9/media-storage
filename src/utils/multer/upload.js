import multer from "multer"
import path from 'path'
import HttpStatus from 'http-status-codes'

const maximumFileSizeMB = 50;

const multerOptions = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, '..', '..', 'storage', 'audio'))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export default multer({
    storage: multerOptions,
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        if(ext !== '.mp3' && ext !== '.wav' && ext !== '.flac' && ext !== '.ogg') {
            // TODO: handle this error without the default express stack trace
            return cb(new Error('Only audio files are allowed'))
        }
        cb(null, true)
    },
    limits: {
        fileSize: maximumFileSizeMB * 1024 * 1024
    },
    onFileSizeLimit: function (file) {
        file.error = {
            message: "File size exceeded",
            status: HttpStatus.REQUEST_TOO_LONG
        }
    }
})