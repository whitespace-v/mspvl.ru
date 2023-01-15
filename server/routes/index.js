const router = require('express').Router()

//import under-routers
const categoryRouter = require('./CategoryRouter')
const vehicleRouter = require('./VehicleRouter')
const userRouter = require('./UserRouter')
const reviewRouter = require('./ReviewRouter')

//under-routers
router.use('/category', categoryRouter)
router.use('/user', userRouter)
router.use('/vehicle', vehicleRouter)
router.use('/review', reviewRouter)

module.exports = router