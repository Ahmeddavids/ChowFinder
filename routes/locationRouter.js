const express = require ('express');
const { newLocation, getLocation, addLocation, getLocationByName } = require('../controllers/locationController');
const router = express.Router();

router.route('/locations').post(newLocation)
router.route('/location/:locationId').get(getLocation)
router.route('/location/').get(getLocationByName)
router.route('/locations/:locationId').post(addLocation)

module.exports = router