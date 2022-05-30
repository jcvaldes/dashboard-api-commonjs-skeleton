const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = Schema(
  {
    title: {
      type: String,
      index: { unique: true },
      trim: true,
      required: [true, 'El título es requerido'],
    },
    url: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, 'La url es requerida'],
    },
    order: {
      type: Number,
      required: [true, 'El orden es requerido'],
    },
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Menu', menuSchema)
