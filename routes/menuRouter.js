const router = require('express').Router();

const { 
    createMenu,
    getOneMenue,
    getAllMenu,
    updateMenu,
    deleteMenu } = require("../controllers/menuController")
    const { isAdmin, userAuth,isRole } = require("../middleware/authmiddleware")

router.route('/:id/create-menu/:categoryId').post(userAuth,isRole, createMenu)
router.route('/menu/getone/:id').get(getOneMenue)
router.route('/menu/getall/:restId').get(getAllMenu )
router.route('/menu/update/:id').put(updateMenu )
router.route('/menu/delete').delete(deleteMenu )




module.exports = router