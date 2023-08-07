const menuModel = require("../models/menuModel")
const restaurantModel = require("../models/restaurantModel")
const mongoose = require("mongoose");
const cloudinary = require("../middleware/cloudinary");
const categoryModel = require('../models/categoryModel')



const createMenu = async (req, res) => {
    try {
      const { name, price, } = req.body;
      if (!name || !price ) {
        return res.status(400).json({ message: "Please enter all fields" });
      }
  
      const findRestaurant = await restaurantModel.findById(req.params.id);
      if (!findRestaurant) {
        return res.status(401).json({
          message: "Restaurant not found",
        });
      }

      const category = await categoryModel.findById(req.params.categoryId);
      if (!category) {
        return res.status(401).json({
          message: "Category not found",
        });
      }
  
      const image = req.files.itemImage.tempFilePath; 
  
      // Upload the image to Cloudinary
      const imageResult = await cloudinary.uploader.upload(image);
  
      // Create a new menu item with the Cloudinary image URL
      const menuData = await menuModel.create({
        restaurant: req.params.id,
            name,
            price,
            category: req.params.categoryId,
            itemImage: imageResult.secure_url, 
        
      });
  
      // Add the menu item to the restaurant's and category menu array
      findRestaurant.menus.push(menuData._id);
      category.menus.push(menuData._id);
  
      // Save the updated restaurant with the new menu item
      await findRestaurant.save();
      await category.save();
  
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
        const user = await menuModel.findById(menuId).populate('category')
        res.json({ user })
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
};


const getAllMenu = async (req, res) => {
    try {
      const findRestaurant = await restaurantModel.findById(req.params.restId);
      if (!findRestaurant) {
        return res.status(401).json({
          message: "Restaurant not found",
        });
      }
      const menus = await menuModel.find({restaurant: req.params.restId}).populate('category')
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
        const menu =await menuModel.findByIdAndDelete()
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

