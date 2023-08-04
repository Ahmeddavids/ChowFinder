const { checkUser, superAuth, authenticate } = require('../middleware/authorization');
const { userSignUp, userLogin,  signOut, verifyEmail, resendVerificationEmail, forgotPassword, changePassword, resetPassword, updateUser, deleteUser } = require('../controllers/userController');
const {addToCart, removeFromCart, } = require('../controllers/cartController');
const { placeOrder, getAllOrders } = require('../controllers/orderController');
const { validationMiddleware, validationUpdate, validationPassword } = require('../middleware/validator');


const router = require('express').Router();

router.route('/api').get((req, res) => {
    res.send('WELCOME TO CHOW FINDER => YOU CRAVE, WE DELIVER')
})

router.route('/sign-up').post(validationMiddleware, userSignUp)

router.route('/log-in').post(userLogin)

router.route('/log-out/:userId').post(authenticate, signOut)

router.route( "/users/verify-email/:token" )
    .get( verifyEmail );

router.route( "/users/resend-verification-email" )
    .post( resendVerificationEmail );
    
router.route('/users/change-password/:token')
.post(validationPassword, changePassword);

router.route('/users/reset-password/:token')
.post(validationPassword, resetPassword);

router.route('/users/forgot-password')
.post(forgotPassword);

router.route('/users/update/:userId')
.patch(authenticate,validationUpdate, updateUser)

router.route('/users/delete-self/:userId')
.delete(authenticate, deleteUser)

router.route('/add-to-cart/:userId')
.post(authenticate, addToCart)

router.route('/remove-from-cart/:userId')
.post(authenticate, removeFromCart)

router.route('/:userId/place-order/:restaurantId')
.post(authenticate, placeOrder)
router.route('/get-all-orders/:userId')
.get(authenticate, getAllOrders)




module.exports = router