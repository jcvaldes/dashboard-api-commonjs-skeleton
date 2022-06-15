const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema

const productSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    }
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)
