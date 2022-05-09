require('dotenv').config()
require('newrelic')
const mongoose = require('mongoose')
const app = require('./app')
const PORT_SERVER = Number(process.env.PORT) || 3977
const IP_SERVER = process.env.IP_SERVER || 'localhost'
const API_VERSION = process.env.API_VERSION || 'v1'
const CLIENT_URL = process.env.CLIENT_URL || 'localhost:3000'
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'unicornio'
console.log({ PORT_SERVER, IP_SERVER, API_VERSION, CLIENT_URL, JWT_SECRET_KEY })
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err
    } else {
      console.log('Conectado a la base de datos')
      app.listen(PORT_SERVER, () => {
        console.log('######################')
        console.log('##### API REST #######')
        console.log('######################')
        console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`)
      })
    }
  }
)
