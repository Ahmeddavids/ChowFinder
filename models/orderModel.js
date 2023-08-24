const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Menu', 
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
  customerAddress: { 
    type: String, 
    required: true 
  },
  cashBackUsed: { 
    type: Number, 
    default: 0 
  },
  cashBackOnOrder: { 
    type: Number, 
    default: 0 
  },
  cashBackToggle: { 
    type: Boolean, 
    // required: true 
  },
  orderDate: { 
    type: Date, 
    default: () => new Date(Date.now() + 60 * 60 * 1000)
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
