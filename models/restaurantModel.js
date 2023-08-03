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
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  profileImage: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  menus: [{
    type: mongoose.Types.ObjectId,
    ref: "Menu",
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
  role:{
    type:String,
    enum:["superAdmin","admin"],
    default:"admin"
  }

}, { timestamps: true });
const restaurantModel = mongoose.model("Restaurant", restaurantSchema)
module.exports = restaurantModel