const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  items: [{
    name: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    itemImage: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
  }],
});

const menuModel = mongoose.model('Menu', menuSchema);
module.exports = menuModel
