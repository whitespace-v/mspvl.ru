const {Category} = require('../models/models')
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");


class CategoryController {
    async create(req,res){
        const {name} = req.body
        const {img} = req.files
        const imgName = uuid.v4() + '.jpg';
        const category = await Category.create({name, img: imgName})
            .then(img.mv(path.resolve(__dirname,'..', 'static', imgName)))
        return res.json(category)
    }
    async getAll(req,res){
        const categories = await Category.findAll()
        return res.json(categories)
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            const data = await Category.findOne({where: {id}})
            await Category.destroy({where: {id}})
            await fs.access(path.resolve(__dirname, '..','static', data.img), fs.F_OK, () =>
                fs.unlinkSync(path.resolve(__dirname, '..', 'static', data.img)))
            return res.json({message: "Category deleted"});
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new CategoryController()