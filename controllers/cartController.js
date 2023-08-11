const cartModel = require('../models/cartModel');
const menuModel = require('../models/menuModel');
const userModel = require('../models/userModel');

// Add an item to the cart
const addToCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { menuItemId } = req.body;

    // Check if the user and menu item exist
    const user = await userModel.findById(userId);
    const menuItem = await menuModel.findById(menuItemId);

    if (!user || !menuItem) {
      return res.status(404).json({
        error: 'User or menu item not found'
      });
    }

    // Find or create the user's cart
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new cartModel({ user: userId, items: [], grandTotal: 0, cashBack: user.cashBack });
    }

    // Check if the menu item is already in the cart
    const existingItem = cart.items.find(item => item.menu.equals(menuItemId));

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.itemTotal = menuItem.price * existingItem.quantity;
    } else {
      const newItem = {
        menu: menuItemId,
        quantity: 1,
        itemPrice: menuItem.price,
        itemName: menuItem.name,
        itemImage: menuItem.itemImage,
        itemTotal: menuItem.price
      };
      cart.items.push(newItem);
    }

    // Recalculate the total price for all items in the cart
    cart.grandTotal = cart.items.reduce((acc, item) => acc + item.itemTotal, 0);

    // Save the cart with the updated items and total
    await cart.save();

    return res.status(200).json({
      message: 'Item added to cart successfully',
      cart
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message
    });
  }
};




// Remove an item from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { menuItemId } = req.body;

    // Check if the user and menu item exist
    const user = await userModel.findById(userId);
    const menuItem = await menuModel.findById(menuItemId);

    if (!user || !menuItem) {
      return res.status(404).json({
        error: 'User or menu item not found'
      });
    }

    // Find the user's cart
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        error: 'Cart not found'
      });
    }
    
    // Check if the user's cart is empty
    if (cart.items.length === 0) {
      return res.status(404).json({
        error: 'Cart is currently empty'
      });
    }


    // Check if the menu item is in the cart
    const existingItemIndex = cart.items.findIndex(item => item.menu.equals(menuItemId));
    if (existingItemIndex === -1) {
      return res.status(404).json({
        error: 'Item not found in the cart'
      });
    }

    // Decrease the quantity of the item by 1
    if (cart.items[existingItemIndex].quantity > 1) {
      cart.items[existingItemIndex].quantity -= 1;
      cart.items[existingItemIndex].itemTotal = menuItem.price * cart.items[existingItemIndex].quantity;
    } else {
      // If the quantity becomes less than or equal to 1, remove the item from the cart
      cart.items.splice(existingItemIndex, 1);
    }

    // Recalculate the total price for all items in the cart
    cart.grandTotal = cart.items.reduce((acc, item) => acc + item.itemTotal, 0);

    // Save the updated cart
    await cart.save();

    if (cart.items.length === 0) {
      return res.status(404).json({
        message: 'Item removed from cart successfully, Your cart is now empty',
      });
    }

    return res.status(200).json({
      message: 'Item removed from cart successfully',
      cart
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message
    });
  }
};




module.exports = {
  addToCart,
  removeFromCart
};
