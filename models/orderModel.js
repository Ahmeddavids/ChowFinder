const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MenuItem', 
    required: true 
  }],
  total: { 
    type: Number, 
    required: true 
  },
  customerName: { 
    type: String, 
    required: true 
  },
  cashBack: { 
    type: Number, 
    default: 0 
  },
  orderDate: { 
    type: Date, 
    default: Date.now 
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;