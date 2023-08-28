const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema({
  businessName: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  location: {
    type: mongoose.Types.ObjectId,
    ref: "Location",
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  description: {
    type: String,
  },
  profileImage: {
    type: String,
    // require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  menus: [{
    type: mongoose.Types.ObjectId,
    ref: "Menu",
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
  isloggedin: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["superAdmin", "admin"],
    default: "admin"
  }

}, { timestamps: true });
const restaurantModel = mongoose.model("Restaurant", restaurantSchema)
module.exports = restaurantModel