'use strict'

import mongoose, { Schema } from 'mongoose'

export default mongoose.model('User', new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  joinDate: {
    type: Date,
    default: () => new Date()
  }
}))
