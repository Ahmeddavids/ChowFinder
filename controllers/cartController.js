const cartModel = require('../models/cartModel');
const menuModel = require('../models/menuModel');
const userModel = require('../models/userModel')


// Add an item to the cart
const addToCart = async (req, res) => {
  try {
    const {userId} = req.user;
    const {menuItemId} = req.body;

    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the menu item exists
    const menuItem = await menuModel.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    // Find or create the user's cart
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new cartModel({ user: userId, items: [] });
    }

    // Check if the menu item is already in the cart
    const existingItem = cart.items.find(item => item.menu.equals(menuItemId));

    if (existingItem) {
      // If the item exists, increase the quantity
      existingItem.quantity += 1;
    } else {
      // If the item does not exist, add it to the cart
      cart.items.push({ menu: menuItemId });
    }

    // Save the cart with the updated items
    await cart.save();

    return res.status(200).json({ message: 'Item added to cart successfully', cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = addToCart;
