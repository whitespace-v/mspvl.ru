const {PriceItem, PriceCategory, PriceImage, Vehicle, VehicleImage} = require('../models/models')
const uuid = require("uuid");
const path = require("path");

class PriceController {
    async createCategory(req,res){
        const {name} = req.body
        const {img} = req.files
        // const price = await Price.create({message})
        // return res.json(review)
        const imgName = uuid.v4() + '.jpg';
        const category = await PriceCategory.create({name, img: imgName})
            .then(img.mv(path.resolve(__dirname,'..', 'static', imgName)))
        return res.json(category)
    }
    async createItem(req,res){
        const {name, priceCategoryId} = req.body
        await PriceItem.create({name, priceCategoryId: Number(priceCategoryId)})
        return res.json({message: 'success'})
    }
    async getAll(req,res){
        const categories = await PriceCategory.findAll()
        const items = await PriceItem.findAll()
        return res.json({categories, items})
    }
    async deleteCategory(req,res){
        try{
            const {id} = req.params;
            await PriceCategory.destroy({where: {id}})
            return res.json({message: "PriceCategory deleted"});
        } catch (e) {
            return res.json(e);
        }
    }
    async deleteItem(req,res){
        try{
            const {id} = req.params;
            await PriceItem.destroy({where: {id}})
            return res.json({message: "PriceItem deleted"});
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new PriceController()