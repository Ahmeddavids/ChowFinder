const router = require('express').Router();

const { 
    createMenu,
    getOneMenue,
    getAllMenu,
    updateMenu,
    deleteMenu } = require("../controllers/menuController")

router.route('/:id/create-menu').post(createMenu)
router.route('/getOne/:id').get(getOneMenue)
router.route('/getAll').get(getAllMenu )
router.route('/update/:id').put(updateMenu )
router.route('/delete').delete(deleteMenu )



module.exports = router