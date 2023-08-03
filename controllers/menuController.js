const menuModel = require("../models/menuModel")
const restaurantModel = require("../models/restaurantModel")
const mongoose = require("mongoose");
const cloudinary = require("../middleware/cloudinary");



const createMenu = async (req, res) => {
    try {
      const { name, price, category } = req.body;
      if (!name || !price || !category) {
        return res.status(400).json({ message: "Please enter all fields" });
      }
  
      const findRestaurant = await restaurantModel.findById(req.params.id);
      if (!findRestaurant) {
        return res.status(401).json({
          message: "Restaurant not found",
        });
      }
  
      const image = req.files.itemImage.tempFilePath; // The file path of the uploaded image
  
      // Upload the image to Cloudinary
      const imageResult = await cloudinary.uploader.upload(image);
  
      // Create a new menu item with the Cloudinary image URL
      const menuData = await menuModel.create({
        restaurant: req.params.id,
            name,
            price,
            category,
            itemImage: imageResult.secure_url, // Use the secure URL from Cloudinary
        
      });
  
      // Add the menu item to the restaurant's menu array
      findRestaurant.menus.push(menuData._id);
  
      // Save the updated restaurant with the new menu item
      await findRestaurant.save();
  
      res.status(200).json({
        message: "Menu item created successfully",
        data: menuData,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  


const getOneMenue = async (req,res)=>{
    try {
        const { menuId } = req.params;
        const user = await menuModel.findById(menuId)
        res.json({ user })
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
};


const getAllMenu = async (req, res) => {
    try {
      const menus = await menuModel.find()
      res.json({ menus });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
};


const updateMenu = async (req, res) => {
    try
    {
        
        const { name, price, category } = req.body
        const menu = await menuModel.findById(req.params.id)
        if(req.file){
           const publicId = menu.itemImage.split('/').pop().split('.')[0];
           await cloudinary.destroy(publicId)
            
            const image = await cloudinary.uploader.upload(req.files.itemImage.tempFilePath);
            await menuModel.findByIdAndUpdate(req.params.id, {
                itemImage: image.secure_url
            }, {
                new: true
            })
        }
        const  menuDaat  = await menuModel.findByIdAndUpdate(req.params.id, {
            name,
            price,
            category
        }, {
            new:true
        })
         
        res.status(200).json({
            message: menuDaat
        })
        
    } catch (erro)
    {
        res.status(404).json({ message: erro.message })
    }
}


const deleteMenu = async (req,res)=>{
    try{
        await cloudinary.destroy(itemImage)
        const menu =await menyModel.findByIdAndDelete()
        if(!menu){
            res.status(404).json({
                message:"menu not found"
            })
        }else{
            res.status(201).json({
                message:"deleted sucssefully",
                data:menuDaat
            })
        }
    }catch(erro){
        res.status(500).json({
            message:erro.message
        })
    }
}
module.exports = {
    createMenu,
    getOneMenue,
    getAllMenu,
    updateMenu,
    deleteMenu
}

