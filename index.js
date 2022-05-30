require('dotenv').config()
require('newrelic')
const mongoose = require('mongoose')
const app = require('./app')
const server = require('http').createServer(app)
const PORT_SERVER = Number(process.env.PORT) || 3977
const IP_SERVER = process.env.IP_SERVER || 'localhost'
const API_VERSION = process.env.API_VERSION || 'v1'

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err
    } else {
      console.log('Conectado a la base de datos')
      server.listen(PORT_SERVER, () => {
        console.log('######################')
        console.log('##### API REST #######')
        console.log('######################')
        console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`)
      })
    }
  }
)
