const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  items: [{
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    itemTotal: {
      type: Number,
      required: true
    }
  }],
  grandTotal: {
    type: Number,
    default: 0
  }
});

const cartModel = mongoose.model('Cart', cartSchema);
module.exports = cartModel
