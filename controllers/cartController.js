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

    // Extract the restaurants ID from the menu
    const restaurantId = menuItem.restaurant;

    // Find or create the user's cart
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new cartModel({ restaurant: restaurantId, user: userId, items: [], grandTotal: 0, cashBack: user.cashBack });
    }

    // Check the existing restaurant ID in the cart and compare with the new menu's restaurant's ID
    if (cart) {
      if (cart.restaurant.toString() !== restaurantId.toString())
        return res.status(400).json({
          error: 'Cannot add items from different restaurants to the same cart'
        })
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

    // Update the user's cashback to reflect the current cashback
    cart.cashBack = user.cashBack

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

    // Update the user's cashback to reflect the current cashback
    cart.cashBack = user.cashBack

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


// Delete an item entirely from cart
const deleteItemFroCart = async (req, res) => {
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
    const existingItem = cart.items.find(item => item.menu.equals(menuItemId));
    if (existingItem) {
      cart.items.splice(existingItem, 1);
    }

    cart.grandTotal = cart.items.reduce((acc, item) => acc + item.itemTotal, 0);

    // Save the updated cart
    await cart.save();

    if (cart.items.length === 0) {
      return res.status(404).json({
        message: 'Item removed from cart successfully, Your cart is now empty',
      });
    }

    return res.status(200).json({
      message: 'Item deleted from cart successfully',
      cart
    });

  } catch (error) {
    console.error(err);
    return res.status(500).json({
      error: err.message
    });
  }
}


// Get a user's cart
const getCart = async (req, res) => {
  try {
    const { userId } = req.user;

    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
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

    res.status(200).json(cart)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message
    });
  }
}



module.exports = {
  addToCart,
  removeFromCart,
  deleteItemFroCart,
  getCart
};
