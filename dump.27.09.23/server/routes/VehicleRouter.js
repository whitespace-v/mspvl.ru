const Router = require('express')
const router = new Router()
const vehicleController = require('../controllers/VehicleController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('Admin'), vehicleController.create) //router.post('/',checkRole('ADMIN'),CategoryController.create)
router.get('/',vehicleController.getAll)
router.get('/:id', vehicleController.getOne)
router.delete('/:id', checkRole('Admin'), vehicleController.delete);

module.exports = router