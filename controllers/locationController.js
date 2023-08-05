const Location = require('../models/locationModel')
const Restaurant = require('../models/restaurantModel')

// Create new location
exports.newLocation = async (req, res) => {
    try {
        const { name, restaurantIds } = req.body;

        // Create a new location
        const location = new Location({ name });

        if (restaurantIds && restaurantIds.length > 0) {
            // Find the restaurants based on the provided restaurantIds
            const foundRestaurants = await Restaurant.find({ _id: { $in: restaurantIds } });
            console.log(foundRestaurants)

            // Push the new restaurant ObjectIds to the location's restaurants array
            foundRestaurants.forEach((restaurant) => {
                location.restaurants.push(restaurant._id);
            });
           
            foundRestaurants.location = location._id;
            
        }

        // Save the location to the database
        await location.save();

        res.status(201).json({
            message: 'Location created successfully',
            data: location,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: error.message,
        });
    }
}

// Get one location
exports.getLocation = async (req, res) => {
    try {
        const { locationId } = req.params;

        const location = await Location.findById(locationId).populate('restaurants');

        if (!location) {
            return res.status(404).json({
                message: `Location with id: ${locationId} not found`,
            });
        }

        res.status(200).json({
            message: 'Location found successfully',
            data: location,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: error.message,
        });
    }
}

// Get all locations
exports.getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();

        if (!locations.length === null) {
            return res.status(404).json({
                message: `There are no locations found in this database`,
            });
        }

        res.status(200).json({
            data: locations,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: error.message,
        });
    }
}

// Get one location by name
exports.getLocationByName = async (req, res) => {
    try {
        const { locationName } = req.body;

        const location = await Location.findOne({name: locationName}).populate('restaurants');

        if (!location) {
            return res.status(404).json({
                message: `Location with name: ${locationName} not found`,
            });
        }

        res.status(200).json({
            message: 'Location found successfully',
            data: location,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: error.message,
        });
    }
}

// Add restaurant to a location
exports.addLocation = async (req, res) => {
    try {
        const { locationId } = req.params;
        const { restaurantId } = req.body;

        // Find the location by its _id
        const location = await Location.findById(locationId);

        if (!location) {
            return res.status(404).json({
                message: `Location with id: ${locationId} not found`,
            });
        }

        // Check if the restaurant already exists in the location
        const existingRestaurantIndex = location.restaurants.indexOf(restaurantId);
        if (existingRestaurantIndex !== -1) {
            return res.status(400).json({
                message: 'Restaurant already exists in this location',
            });
        }

        // Find the restaurant by its _id
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({
                message: `Restaurant with id: ${restaurantId} not found`,
            });
        }

        // Add the new restaurant ObjectId to the location's restaurants array
        location.restaurants.push(restaurant._id);

        // Save the updated location to the database
        await location.save();

        res.status(200).json({
            message: 'Restaurant added to location successfully',
            data: location,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: error.message,
        });
    }
}