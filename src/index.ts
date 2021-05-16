require('dotenv').config()
import express from 'express'
import session, { SessionOptions } from 'express-session'
import {getEnv} from './env'
import routes from './routes'
require('./services/database')

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7
const SERVER_PORT = process.env.PORT || 3000

const app = express()

const sessionConfig: SessionOptions = {
    secret: getEnv("SECRET_KEY"),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: ONE_WEEK
    }
}

app.use(express.json())
app.use(session(sessionConfig))
app.use(routes)


app.listen(SERVER_PORT, () => console.log(`[Server] Listening on port ${SERVER_PORT}`))