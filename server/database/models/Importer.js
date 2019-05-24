'use strict'

import mongoose, { Schema } from 'mongoose'
import _user from './_user'

export default mongoose.model('Importer', new Schema({
  ..._user
}))
