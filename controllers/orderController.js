const userModel = require('../models/userModel');
const restaurantModel = require('../models/restaurantModel');
const menuModel = require('../models/menuModel');
const cartModel = require('../models/cartModel')
const orderModel = require('../models/orderModel');


// User to place an order
const placeOrder = async (req, res) => {
    try {
      const { userId } = req.user;
      const { restaurantId } = req.params;
      const { customerAddress } = req.body;
  
      // Find the user from the database
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the restaurant from the database
      const restaurant = await restaurantModel.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
      }
  
      // Find the user's cart
      const cart = await cartModel.findOne({ user: userId });
      if (!cart || cart.items.length === 0) {
        return res.status(404).json({ message: 'Cart not found or is empty' });
      }
  
      // Find the menu from the database based on the restaurantId
      const menu = await menuModel.findOne({ restaurant: restaurantId });
      if (!menu) {
        return res.status(404).json({ message: 'Menu not found for this restaurant' });
      }
  
      // Calculate the total amount based on the items in the cart
      let total = 0;
      cart.items.forEach(async (cartItem) => {
        // Find the corresponding menu item in the menu model
        const menuItem = await menuModel.findById(cartItem.menu);
        if (!menuItem) {
      
          console.log(`Menu item not found for menu ID: ${cartItem.menu}`);
          return; 
        }
  
        // Calculate the total price for the cart item based on the quantity and menu item price
        const itemTotal = cartItem.quantity * menuItem.price;
        total = itemTotal;
  
        // Update the cart item's total price
        cartItem.total = itemTotal;
      });
  
      // Update the cart's total price
      cart.total = total;
      await cart.save();
  
      // Calculate cash back based on the total amount and the user's cashback toggle
      let cashBackToUse = 0;
      if (user.cashBackToggle) {
        cashBackToUse = Math.min(user.cashBack, total);
      }
  
      // Apply cash back to the current order
      const discountedTotal = total - cashBackToUse;

      user.cashBack = user.cashBack - cashBackToUse;
  
      // Calculate cash back amount for the next order
      let cashBackAmount = 0;
      if (discountedTotal >= 2000) {
        cashBackAmount = 60;
      }
  
      // Add cashback amount to the existing cashback balance
      user.cashBack += cashBackAmount;
      console.log(user.cashBack)
  
      // Create the order and save it to the database
      const orderItems = cart.items.map((cartItem) => cartItem.menu);
      const userOrder = await orderModel.create({
        items: orderItems,
        total: discountedTotal,
        customerName: user.fullName,
        customerAddress,
        cashBack: cashBackToUse,
      });
  
      // Link the order to the user's 'orders' field
      user.orders.push(userOrder._id);
  
      // Clear the user's cart after placing the order
      cart.items = [];
      cart.total = 0;
      await cart.save();
  
      user.cashBackToggle = false
      // Save the user changes to the database
      await user.save();
  
      res.status(201).json(userOrder);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
  };
  
  
//   Get all orders
  const getAllOrders = async (req, res) => {
    try {
      const { userId } = req.user;
  
      // Find the user from the database
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find all orders for the user and sort them based on the last updated order (descending)
      const orders = await orderModel.find({ _id: { $in: user.orders } })
        .sort({ updatedAt: -1 });
  
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get orders', error: error.message });
    }
  };
  


  module.exports = {
    placeOrder,
    getAllOrders
  };
