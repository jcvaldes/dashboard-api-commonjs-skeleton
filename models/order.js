const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema

const orderSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
