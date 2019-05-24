import _user from './_user'
import Exporter from '../models/Exporter'
import Importer from '../models/Importer'

export default {
  ..._user(Importer),

  async getOffer(offerId) {
    const doc = await Exporter.findOne({ 'offers._id': offerId })
    console.log(doc)
    return doc
  },

  async buy(userId, offerId, quantity) {
    const offer = await this.getOffer(offerId)
    if (!offer)
      throw new Error('The offer was not found.')

    if (offer.orderable - quantity < 0)
      throw new Error('You can\'t buy more than available stock.')

    // Update orderable stock
    const doc = await Exporter.update({ 'offers._id': offerId },
      {
        $inc: {
          'offers.$.orderable': -quantity
        }
      },
      { runValidators: true, new: true })

    // create the order
    const newOffer = await Exporter.findByIdAndUpdate(doc._id,
      {
        $push: {
          'orders': {
            coffeeType: offer.coffeeType,
            originCountryCode: offer.originCountryCode,
            quantity,
            importerId: userId,
            fromOfferId: offer._id
          }
        }
      },
      { runValidators: true, new: true })

    return true
  },

  async listOrders(userId) {
    const doc = await Exporter.find({ 'orders.$.importerId': userId })
    if (!doc || !doc.orders) return []

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
  }
}
