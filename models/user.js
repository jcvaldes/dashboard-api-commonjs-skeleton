const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema

const validRoles = {
  values: ['ADMIN', 'CUSTOMER', 'EDITOR', 'REVIEWER'],
  message: '{VALUE} no es un rol permitido',
}
const userSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      index: { unique: true },
      required: [true, 'El correo es requerido'],
    },
    password: { type: String, required: [true, 'La contraseña es requerida'] },
    avatar: {
      type: String,
    },
    role: { type: String, required: true, default: 'ADMIN', enum: validRoles },
    agreement: { type: Boolean, required: true, default: false },
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
)

userSchema.methods.fullname = function () {
  return this.name + ' ' + this.lastname
}
userSchema.pre('save', function (next) {
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

userSchema.pre('findOneAndUpdate', function (next) {
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!this._update.password) {
    delete this._update.password
    return next()
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    this._update.password = bcrypt.hashSync(this._update.password, 10)
    next()
  })
})

userSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}
module.exports = mongoose.model('User', userSchema)
