'use strict'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserModel from '../models/User'
import { TEST_MODE, jwtSecret } from '../../../config'
import { dbLogger } from '../../winston.config'
import { formatLog, formatError } from '../../functions'

export default class User {
  static get Model() {
    return UserModel
  }

  static log(data, format = true) {
    if (!TEST_MODE) dbLogger.info(format ? formatLog(data) : data)
  }

  /**
   * Register a new user
   * @param {String} username The username of the new user (unique)
   * @param {String} password The password of the new user (will be hashed)
   * @returns {Promise<Object>} The newly registered user username
   * @throws The username is already taken
   */
  static async register(username, password) {
    try {
      // Hash the password and create the user
      const hash = await bcrypt.hash(password, 10)
      const doc = await UserModel.create({ username, password: hash })

      this.log(`New user was created. username=${username}, id=${doc.id}`)
      return doc.username
    }
    catch (err) {
      this.log(formatError(err), false)
      throw new Error(`Could not create the user. ${err.message}`)
    }
  }

  /**
   * @typedef {Object} LoginObject Represents a login object response
   * @property {String} token A JWT auth token
   * @property {String} username The user's username
   */
  /**
   * Check a user login
   * @param {String} username The username of the user
   * @param {String} password The password of the user
   * @returns {Promise<LoginObject>} A login object response
   * @throws The username is already taken
   */
  static async login(username, password) {
    try {
      // Check username exists
      const user = await UserModel.findOne({ username }).select('+password')
      // Check password is valid
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) throw new Error('Invalid password')

      // Sign a JWT and return it
      const token = jwt.sign({
        id: user._id,
        username: user.username,
        role: user.role
      }, jwtSecret)

      this.log(`User logged in. username=${user.username}, id=${user.id}`)
      return {
        token,
        username: user.username,
        role: user.role
      }
    }
    catch (err) {
      this.log(formatError(err), false)
      throw new Error('Invalid username or password.')
    }
  }

  /**
   * Deleted a registered user
   * @param {String} userId The user id of the user to delete
   * @returns {Promise<String>} Id of the deleted user
   * @throws Could not find the user to delete
   */
  static async delete(userId) {
    const doc = await UserModel.findByIdAndDelete(userId)
    this.log(`A user was deleted. id=${doc.id}`)
    return doc.id
  }

  /**
   * Find data of a registered user
   * @param {String} userId The user id of the user
   * @returns {Promise<Object>} the user's data
   * @throws Could not find the user
   */
  static async find(userId) {
    let user = await UserModel.findById(userId)
    user.__v = undefined
    return user
  }
}
