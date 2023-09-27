const sequelize  = require('../database')
const {DataTypes} = require('sequelize')

//main entities
const User = sequelize.define('user', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number:              {type: DataTypes.STRING, allowNull: false, unique: true },  //unique is
    password:            {type: DataTypes.STRING, allowNull: false},
    role:                {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Vehicle = sequelize.define('vehicle', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    categoryId:          {type: DataTypes.INTEGER,   allowNull: false }, //remove it bc vehicle-categoryId creating automatically
    name:                {type: DataTypes.STRING,    allowNull: false },
    description:         {type: DataTypes.STRING,    allowNull: false },
    price:               {type: DataTypes.INTEGER,   allowNull: false, defaultValue: 0},
    image:               {type: DataTypes.STRING,    allowNull: false },
})
const Review = sequelize.define('review', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    message:             {type: DataTypes.STRING,    allowNull: false },
})

//helpers
const VehicleImage = sequelize.define('vehicle_image', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img:                 {type: DataTypes.STRING,    allowNull: false}
})
const VehicleField = sequelize.define('vehicle_field', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.INTEGER,    allowNull: false},
    text:                {type: DataTypes.STRING,    allowNull: false},
})

//sorting entities
const Category = sequelize.define('vehicle_category', {
    id:                  {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:                {type: DataTypes.STRING,    allowNull: false },
    img:                 {type: DataTypes.STRING,    allowNull: false }
})


//Merged sorting entities (for next relations):

// empty


//define relations between HELPERS and MAIN entities
Vehicle.hasMany(VehicleImage,{as: 'images'})
VehicleImage.belongsTo(Vehicle)

Vehicle.hasMany(VehicleField,{as: 'fields'})
VehicleField.belongsTo(Vehicle)

//define relations between SORTING and MAIN entities:
Category.hasMany(Vehicle)
Vehicle.belongsTo(Category)

//define relations between SORTING entities:

//empty

//export
module.exports = {
    User, Vehicle, VehicleField, VehicleImage, Category, Review
}