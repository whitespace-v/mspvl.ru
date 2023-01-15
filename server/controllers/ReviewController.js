const {Review} = require('../models/models')

class ReviewController {
    async create(req,res){
        const {message} = req.body
        const review = await Review.create({message})
        return res.json(review)
    }
    async getAll(req,res){
        const reviews = await Review.findAll()
        return res.json(reviews)
    }
    async delete(req,res){
        try{
            const {id} = req.params;
            await Review.destroy({where: {id}})
            return res.json({message: "Review deleted"});
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new ReviewController()