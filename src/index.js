import http from 'http'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import config from './config.json'
import router from './routes/index.js'

const pjson = require('../package.json')

const winston = require('winston')
require('winston-logstash')

winston.add(winston.transports.Logstash, {
    port: 13302,
    node_name: 'Media storage microservice',
    meta: {
        version: pjson.version || process.env.VERSION || '0.1.0',
        environment: process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
    },
    host: '50640222-d785-48fb-afbb-62a948d61574-ls.logit.io'
})

let app = express()
app.server = http.createServer(app)

// logger
app.use(morgan('dev'))

// 3rd party middleware
app.use(cors({
    exposedHeaders: config.corsHeaders
}))

app.use(bodyParser.json({
    limit : config.bodyLimit
}))

app.use('/', router)

app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
});

export default app