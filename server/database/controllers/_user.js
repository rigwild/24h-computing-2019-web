'use strict'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { TEST_MODE, jwtSecret } from '../../../config'
import { dbLogger } from '../../winston.config'
import { formatLog, formatError } from '../../functions'

export default CustomModel => ({
  get Model() {
    return CustomModel
  },

  log(data, format = true) {
    if (!TEST_MODE) dbLogger.info(format ? formatLog(data) : data)
  },

  /**
   * Register a new user
   * @param {String} username The username of the new user (unique)
   * @param {String} password The password of the new user (will be hashed)
   * @param {String} role The role of the new user
   * @param {Object} address The full address of the new user
   * @param {String} phone The full address of the new user
   * @returns {Promise<Object>} The newly registered user username
   * @throws The username is already taken
   */
  async register(username, password, role, address, phone) {
    try {
      // Hash the password and create the user
      const hash = await bcrypt.hash(password, 10)
      const doc = await CustomModel.create({ username, password: hash, role, address, phone })

      this.log(`New user was created. username=${username}, id=${doc.id}`)
      return { username, role }
    }
    catch (err) {
      this.log(formatError(err), false)
      throw new Error(`Could not create the user. ${err.message}`)
    }
  },

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
  async login(username, password) {
    try {
      // Check username exists
      const user = await CustomModel.findOne({ username }).select('+password')
      if (!user) throw new Error('Unknown user')

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
  },

  /**
   * Deleted a registered user
   * @param {String} userId The user id of the user to delete
   * @returns {Promise<String>} Id of the deleted user
   * @throws Could not find the user to delete
   */
  async delete(userId) {
    const doc = await CustomModel.findByIdAndDelete(userId)
    this.log(`A user was deleted. id=${doc.id}`)
    return doc.id
  },

  /**
   * Find data of a registered user
   * @param {String} userId The user id of the user
   * @returns {Promise<Object>} the user's data
   * @throws Could not find the user
   */
  async find(userId) {
    let user = await CustomModel.findById(userId)
    if (!user) throw new Error('User not found.')

    user.__v = undefined
    return user
  }
})
