'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Parking.init({
    vihecle_id: DataTypes.STRING,
    parking_in: DataTypes.DATE,
    parking_out: DataTypes.DATE,
    price: DataTypes.INTEGER,
 
  }, {
    sequelize,
    modelName: 'Parking',
    hooks: {
      beforeValidate(Parking) {
        var price = 0
        var rate_hour = 5000
        var rate_day = 80000


        var day = Parking.parking_out.getDate() - Parking.parking_in.getDate()

        price += day*rate_day

        var minute = Parking.parking_out.getMinutes() - Parking.parking_in.getMinutes()

       

        var second = Parking.parking_out.getSeconds() - Parking.parking_in.getSeconds()

        if(minute > 1 || minute == 1 && second >= 1 ){
           price += minute *rate_hour
        }

        Parking.price = price
        
        
      },
    }
  });

  Parking.associate = function(models) {

    Parking.belongsTo(models.Vehicle, {
      foreignKey: "vihecle_id",
      as: "vehicle"
      // constraints: false
    });
  }
  return Parking;
};