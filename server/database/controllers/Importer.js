import _user from './_user'
import CustomModel from '../models/Importer'

export default {
  ..._user(CustomModel),

  async buy(userId, offerId, quantity) {

  },
  async listOrders(userId) { }
}
