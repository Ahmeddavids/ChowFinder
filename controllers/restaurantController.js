const restaurantModel = require('../models/restaurantModel')
const cloudinary = require("../middleware/cloudinary")
const bcryptjs = require("bcrypt")
const { mailTemplate, forgotMailTemplate } = require('../middleware/mailTemplate');


const { sendEmail } = require("../middleware/sendMail");
const { genToken, decodeToken } = require("../middleware/jwt");
const fs = require("fs");

exports.newrestaurant = async (req, res) => {
    try {
      const { 
        businessName,
        address, 
        email,
        description,  
        phoneNumber, 
        password,
        confirmPassword} = req.body;

      const isEmail = await restaurantModel.findOne({ email });
      if (password === confirmPassword) {
        if (isEmail) {
          res.status(400).json({
            message: "email already registerd",
          });
        } else {
          const salt = bcryptjs.genSaltSync(10);
          const hash = bcryptjs.hashSync(password, salt);

          const image =await cloudinary.uploader.upload(req.files.profileImage.tempFilePath)

          const restaurant = await restaurantModel.create({
        businessName: businessName.toUpperCase(),
        address, 
        email: email.toLowerCase(),
        description,  
        phoneNumber, 
        password:hash,
        confirmPassword: hash,
        profileImage: image.secure_url
          });
          const token = await genToken(restaurant._id, "1d");
          console.log(token)

          const subject = "New restaurant";
          const link = `${req.protocol}://${req.get("host")}/rest/verify/${token}`;
          const html = await mailTemplate(link, restaurant.businessName);
          const mail = {
          email: email,
          subject,
          html,
        };
          sendEmail(mail);
          const savedRestaurant = await restaurant.save();
          res.status(200).json({
            success: true,
            data: savedRestaurant,
          });
        }
      } else {
        res.status(400).json({
          message: "Your password and Confirm password must match",
        });
      }
    } catch (error) {
        console.error(error)
      res.status(500).json({
        message: error.message,
      });
    }
  };

  exports.restaurantVerify = async (req, res) => {
    try {
      const { token } = req.params;
      console.log(token);
      //console.log(id);
      const restaurantInfo = await decodeToken(token);
      //const tokens = await jwt.verify(token, process.env.JWT_SECRET);
      if (restaurantInfo) {
        await restaurantModel.findByIdAndUpdate(restaurantInfo._id, { isVerified: true });
        res.status(200).json({ message: "restaurant verified" });
      } else {
        throw new Error("error verifying restaurant, please try again");
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  exports.resendEmailVerification = async (req, res) => {
    try {
      const { email } = req.body;
      const restaurant = await restaurantModel.findOne({ email });
      if (restaurant && !restaurant.isVerified) {
        const token = await genToken(restaurant._id, "1d");
        const subject = "New restaurant";
        const link = `${req.protocol}://${req.get("host")}/rest/verify/${token}`;
        const html = await mailTemplate(link, restaurant.businessName);
          const mail = {
          email: email,
          subject,
          html,
        };
          sendEmail(mail);
          await restaurant.save();
        res.status(200).json({
          message: "verificaton email sent",
        });
      } else if (restaurant?.isVerified) {
        res.status(200).json({
          message: "restaurant already verified",
        });
      } else {
        res.status(404).json({
          message: `restaurant with this ${email} not found`
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// SIGNIN
  exports.signin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const restaurant = await restaurantModel.findOne({ email });
      let checkPassword = false;
      if (restaurant) {
        checkPassword = bcryptjs.compareSync(password, restaurant.password);
      }
      if (!restaurant || !checkPassword) {
        res.status(400).json({
          message: "invalid Login Please try again",
        });
      } else if (restaurant.isBlocked) {
        res.status(200).json({
            message: "This restaurant is blocked"
         });
      } else if (!restaurant.isVerified) {
        const token = await genToken(restaurant._id, "1d");
        const subject = "verify now";
        const link = `${req.protocol}://${req.get("host")}/verify/${token}`;
        const message = ` kindly use this ${link} to Re-verify your account`;
        const data = {
          email: email,
          subject,
          message,
        };
        sendEmail(data);
        res.status(401).json({
          message: "you are not verified check your email to verify",
        });
      } else {
        restaurant.isloggedin = true;
        const token = await genToken(restaurant._id, "1d");
        await restaurant.save();
  
        res.status(200).json({
             token, restaurant
             });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      //create a link with the reset password link and send it to email
      const restaurant = await restaurantModel.findOne({ email });
      if (restaurant) {
        const subject = "forgotten password";
        const token = await genToken(restaurant._id, "20m");
        // for better security practice a unique token should be sent to reset password instead of user._id
        const link = `${req.protocol}://${req.get("host")}/reset-password/${token}`;
        const message = `click the ${link} to reset your password`;
        const data = {
          email: email,
          subject,
          message,
        };
        sendEmail(data);
        res.status(200).json({
          message: "Check your registered email for your password reset link",
        });
      } else {
        res.status(404).json({
          message: "restaurant not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  exports.resetpassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
      const salt = bcryptjs.genSaltSync(10);
      const hashedPassword = bcryptjs.hashSync(newPassword, salt);
      const restaurantInfo = await decodeToken(token);
      const restaurant = await restaurantModel.findByIdAndUpdate(restaurantInfo._id, {password: hashedPassword,});
      if (restaurant) {
        res.status(200).json({
          message: "password successfully reset",
        });
      } else {
        res.status(500).json({
          message: "error changing password",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  exports.logout = async (req, res) => {
    try {
      const restaurant = await restaurantModel.findById(req.user._id);
      const blacklist = [];
      const hasAuthorization = req.headers.authorization;
      const token = hasAuthorization.split(" ")[1];
      blacklist.push(token);
      restaurant.isloggedin = false;
      await restaurant.save();
      res.status(200).json({ 
        message: "logged out successfully" 
    });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  exports.getAll = async (req, res) => {
    try {
      const restaurant = await restaurantModel.find().populate('menus');
      if(restaurant){
        res.status(200).json({
            restaurant
        });
      } else {
        res.status(404).json({
            message: 'Restaurant not found'
        })
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  exports.getOne = async (req, res) => {
    try {
      const  restaurantId  = req.params.id;
      const restaurant = await restaurantModel.findById(restaurantId).populate('menus');
      if(restaurant){
        res.status(200).json({
            restaurant
        })
      }
      else {
        res.status(404).json({
            message: 'Restaurant not found'
        })
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  exports.updaterestaurant = async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const { 
        businessName, 
        email, 
        address,
        location
      } = req.body;
  
      const restaurant = await restaurantModel.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: "No restaurant found" });
      } 
  
      if (req.files && req.files.profileImage) {
        const file = req.files.profileImage;
  
        // Upload the profile image to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath);
  
        // Delete the existing profile image if it exists
        if (restaurant.profileImage) {
          const publicId = restaurant.profileImage
            .split("/")
            .pop()
            .split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
  
        // Update the restaurant with the new profile image URL and other fields
        const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
          restaurantId,
          {
            businessName,
            email,
            address,
            location,
            profileImage: result.secure_url,
          },
          { new: true }
        );
  
        res.status(200).json({ message: "Restaurant updated", updatedRestaurant });
      } else {
        // Update the restaurant without changing the profile image
        const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
          restaurantId,
          { businessName, email, address, location },
          { new: true }
        );
  
        res.status(200).json({ message: "Restaurant updated", updatedRestaurant });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  //Delete
  
  exports.deleterestaurant = async (req, res) => {
    try {
      const { restaurantId } = req.params;
  
      const restaurant = await restaurantModel.findById(restaurantId);
      console.log(req.user._id.toString());
      console.log(restaurant.id);
      if (!restaurant) {
        res.status(404).json({ message: "no restaurant found" });
      } else if (req.user._id.toString() == restaurantId || req.user.isAdmin) {
        const deletedrestaurant = await restaurantModel.findByIdAndDelete(restaurantId);
        res.status(200).json({ message: "restaurant deleted", deletedrestaurant });
      } else {
        res
          .status(401)
          .json({ messgae: "you are not authorized to delete this restaurant" });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };



  
  exports.searchlocation = async (req, res) => {
    try {
    
      const search = req.query.search ? {
        $or:[
          {location:{$regex: req.query.search, $options:"i"}}
        ]
      } : {}

      const locationdd = await restaurantModel.find(search)
      if(locationdd.length === 0){
        return  res.status(400).json({
          message:"location not found"
        })
      }
        res.status(200).json({
          message:"found",
          data :  locationdd
         
        })
      
     
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  
  
  



  
  