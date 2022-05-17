const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '5mb' }))
process.env.CLIENT_URL
console.log('TCL: process.env.CLIENT_URL', process.env.CLIENT_URL)
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
)
const API_VERSION = process.env.API_VERSION || 'v1'

// Load routings
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const imageRoutes = require('./routes/image')

// Configure Header HTTP
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL)
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
//   )
//   res.header(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   )
//   res.header('Allow', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//   next()
// })
// Router Basic
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, imageRoutes)

module.exports = app
