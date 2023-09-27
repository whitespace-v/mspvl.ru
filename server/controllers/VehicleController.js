const {VehicleImage, Vehicle} = require('../models/models')
const path = require('path')
const uuid = require('uuid')
const sequelize  = require('../database')
const fs = require('fs')

class VehicleController {
    async create(req,res){
        const {categoryId, name, description,} = req.body
        const {images} = req.files;
        let imgName = uuid.v4() + '.jpg';
        const vehicle = await Vehicle.create({
            image: imgName,
            name,
            description,
            price: 0,
            categoryId
        }).then(images[0].mv(path.resolve(__dirname,'..', 'static', imgName)))

        for (let i = 0; i < images.length; i++) {
            imgName = uuid.v4() + '.jpg'
            await images[i].mv(path.resolve(__dirname,'..', 'static', imgName))
            await VehicleImage.create({img: imgName, vehicleId: vehicle.id})
        }
        return res.json('item')
    }

    async getAll(req,res) {
        const {categoryId, page, limit} = req.query
        let offset = page * limit - limit
        let vehicles
        try {
            if (categoryId !== '0') {
                vehicles = await Vehicle.findAndCountAll({where: {categoryId}, limit, offset, order: [['price', 'ASC']]})
                return res.json(vehicles)
            } else {
                vehicles = await Vehicle.findAndCountAll({ limit, offset, order: [['price', 'ASC']]})
                return res.json(vehicles)
            }
        }
        catch (e) {
            return res.json(e)
        }
    }
    async getOne(req,res){
        const {id} = req.params
        const vehicle = await Vehicle.findOne({where: {id}, include: [{model: VehicleImage, as: 'images'}]})
        return res.json(vehicle)
    }
    async delete(req, res) {
        try {
            const {id} = req.params;
            const vehicle = await Vehicle.findOne({where:{id}})
            //delete main image
            try {
                fs.access(path.resolve(__dirname, '..','static', vehicle.dataValues.image), fs.F_OK, () => {
                    fs.unlinkSync(path.resolve(__dirname, '..', 'static', vehicle.dataValues.image))
                })
            } catch (e) {
                return res.json({e})
            }
            //delete images
            const images = await VehicleImage.findAll({where: {vehicleId: id}})
            try {
                for (let i = 0; i < images.length; i++) {
                    fs.access(path.resolve(__dirname, '..','static', images[i].dataValues.img), fs.F_OK, () => {
                        fs.unlinkSync(path.resolve(__dirname, '..', 'static', images[i].dataValues.img))
                    })
                }
            } catch (e) {
                return res.json({e})
            }
            //delete item
            await VehicleImage.destroy({where: {vehicleId: id}})
            await Vehicle.destroy({where:{id}})
            return res.json({message: "item deleted"});
        } catch (e) {
            return res.json({e})
        }
    }
}

module.exports = new VehicleController()