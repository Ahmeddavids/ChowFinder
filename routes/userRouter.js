const { checkUser, superAuth, authenticate } = require('../middleware/authorization');
const { userSignUp, userLogin,  signOut, verifyEmail, resendVerificationEmail, forgotPassword, changePassword, resetPassword, updateUser, deleteUser } = require('../controllers/userController');
const {addToCart, removeFromCart, deleteItemFroCart, getCart} = require('../controllers/cartController');
const { placeOrder, getAllOrders } = require('../controllers/orderController');
const { validationMiddleware, validationUpdate, validationPassword } = require('../middleware/validator');


const router = require('express').Router();

router.route('/api').get((req, res) => {
    res.send('WELCOME TO CHOW FINDER => YOU CRAVE, WE DELIVER')
})

router.route('/sign-up').post(validationMiddleware, userSignUp)

router.route('/log-in').post(userLogin)

router.route('/log-out/').post(authenticate, signOut)

router.route( "/users/verify-email/:token" )
    .get( verifyEmail );

router.route( "/users/resend-verification-email" )
    .post(validationUpdate,  resendVerificationEmail );
    
router.route('/users/change-password/:token')
.post(validationPassword, changePassword);

router.route('/users/reset-password/:token')
.post(validationPassword, resetPassword);

router.route('/users/forgot-password')
.post(validationUpdate, forgotPassword);

router.route('/users/update/')
.patch(authenticate,validationUpdate, updateUser)

router.route('/users/delete-self/')
.delete(authenticate, deleteUser)

router.route('/add-to-cart/')
.post(authenticate, addToCart)

router.route('/remove-from-cart/')
.post(authenticate, removeFromCart)

router.route('/place-order/')
.post(authenticate, placeOrder)

router.route('/get-all-orders/')
.get(authenticate, getAllOrders)

router.route('/get-cart/')
.get(authenticate, getCart)

router.route('/delete-from-cart/')
.delete(authenticate, deleteItemFroCart)



module.exports = router