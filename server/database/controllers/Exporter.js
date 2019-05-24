import _user from './_user'
import Exporter from '../models/Exporter'
import Importer from '../models/Importer'

export default {
  ..._user(Exporter),

  async createOffer(userId, coffeeType, originCountryCode, amount, bagPrice) {
    const doc = await Exporter.findByIdAndUpdate(userId, {
      $push: {
        offers: {
          coffeeType,
          originCountryCode,
          orderable: amount,
          real: amount,
          bagPrice
        }
      }
    }, { runValidators: true, new: true })
    return doc.offers[doc.offers.length - 1]
  },

  async listOffers(userId) {
    const doc = await Exporter.findById(userId)
    return doc.offers || []
  },

  async listOrders(userId) {
    const doc = await Exporter.findById(userId)

    const ele = doc.orders.map(x => x)
    let obj = []
    // Get the foreign keys
    for (const order in ele) { /* eslint guard-for-in:0 */
      const { importerId, fromOfferId } = ele[order]
      delete ele[order].importerId
      delete ele[order].fromOfferId
      const importer = await Importer.findById(importerId)
      console.log('const importer = await Importer.findById(importerId)')
      console.log(importer)

      const offer = await Importer.findById(fromOfferId)
      console.log('const offer = await offer.findById(fromOfferId)')
      console.log(offer)
      obj.push(Object.assign(ele[order], { importer, offer }))
    }
    return obj
  },

  async getOrder(userId, orderId) {
    const exporter = await Exporter.findById(userId)
    return exporter.orders.find(x => x._id === orderId)
  },

  async getOffer(userId, offerId) {
    const doc = await Exporter.findById(userId)
    return doc.offers.find(x => x._id === offerId)
  },

  async updateOrderState(userId, orderId, newProgressState) {
    const order = this.getOrder(userId, orderId)

    if (!order) throw new Error('Could not find the order.')

    if (newProgressState === 'cancelled' && ['pendingValidation', 'finished'].some(x => x === order.progress))
      throw new Error('You can\'t cancel an order that is validated or finished.')

    // Set order state
    const doc = await Exporter.update({ '_id': userId, 'orders._id': order._id },
      { $set: { 'orders.$.progress': newProgressState } },
      { runValidators: true, new: true })

    // If order is finished, lower offer stock
    if (newProgressState === 'finished') {
      await Exporter.update({ '_id': userId, 'offers._id': order.fromOfferId },
        {
          $set: {
            'offers.$.active': false
          },
          $inc: {
            'offers.$.real': -order.quantity
          }
        },
        { runValidators: true, new: true })
    }

    console.log('zefzefzefzefuzehfizefize')
    console.log(doc)
    return doc
  }
}
