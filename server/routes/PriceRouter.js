const Router = require('express')
const router = new Router()
const priceController = require('../controllers/PriceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/category',checkRole('Admin'), priceController.createCategory)
router.post('/item',checkRole('Admin'), priceController.createItem)
router.get('/',priceController.getAll)
router.delete('/category/:id', checkRole('Admin'), priceController.deleteCategory);
router.delete('/item/:id', checkRole('Admin'), priceController.deleteItem);
module.exports = router