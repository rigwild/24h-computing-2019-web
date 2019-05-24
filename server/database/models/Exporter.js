'use strict'

import mongoose, { Schema } from 'mongoose'
import _user from './_user'

const integerOnly = {
  type: Number,
  get: v => Math.round(v),
  set: v => Math.round(v)
}

const coffeeType = {
  type: String,
  enum: ['arabica', 'robusta'],
  required: true
}


export default mongoose.model('Exporter', new Schema({
  ..._user,
  offers: [
    {
      active: {
        type: Boolean,
        default: true
      },
      coffeeType,
      originCountryCode: {
        type: String,
        required: true
      },
      orderable: {
        ...integerOnly,
        required: true
      },
      real: {
        ...integerOnly,
        required: true
      },
      bagPrice: {
        ...integerOnly,
        required: true
      }
    }
  ],
  orders: [
    {
      progress: {
        type: String,
        enum: ['pendingValidation', 'preparation', 'sentPending', 'sent', 'finished', 'cancelled'],
        required: false,
        default: 'pendingValidation'
      },
      startedDate: {
        type: Date,
        default: () => new Date()
      },
      coffeeType,
      originCountryCode: {
        type: String,
        required: true
      },
      quantity: {
        ...integerOnly,
        required: true
      },
      importerId: {
        type: String,
        required: true
      },
      fromOfferId: {
        type: String,
        required: true
      }
    }
  ]
}))
