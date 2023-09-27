const Router = require('express')
const router = new Router()
const reviewController = require('../controllers/ReviewController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', reviewController.create) //router.post('/',checkRole('ADMIN'),CategoryController.create)
router.get('/',reviewController.getAll)
router.delete('/:id', checkRole('Admin'), reviewController.delete);
module.exports = router