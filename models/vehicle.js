'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vehicle.init({
    name: {
      type:DataTypes.STRING,
      validate: {
        isunique(value) {
          
          return Vehicle.findOne({
              where: {
                name: value
              }
            })
            .then(function (data) {
              if (data !== null) {
                throw new Error('vehicle name already exist')
              }
            })
            .catch(err => {
              throw new Error(err)
            })
        }
      }
    },
    rate_hour: DataTypes.INTEGER,
    rate_day: DataTypes.INTEGER,
 
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};