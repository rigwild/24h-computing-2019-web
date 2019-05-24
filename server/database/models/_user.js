export default {
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
    enum: ['importer', 'exporter'],
    required: true
  },
  joinDate: {
    type: Date,
    default: () => new Date()
  },
  address: {
    street: {
      number: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    postalCode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    countryCode: {
      type: String,
      required: true
    }
  },
  phone: {
    type: String,
    required: true
  }
}
