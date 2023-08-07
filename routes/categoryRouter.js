const { newCategory, getAllCategories, oneCategory } = require('../controllers/categoryController');
const router = require('express').Router();


router.route('/create-category').post(newCategory);
router.route('/all-categories').get(getAllCategories);
router.route('/category/:id').get(oneCategory);


module.exports = router