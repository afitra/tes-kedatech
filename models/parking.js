'use strict';
const {
  Model
} = require('sequelize');

const 
  Vehicle
   = require("./vehicle")
   const { getPrice } = require('../helpers/getPrice')
module.exports = (sequelize, DataTypes) => {
  class Parking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
 
    static associate(models) {
      Parking.belongsTo(models.Vehicle, {
        foreignKey: "vehicle_id",
        as: "vehicle"
   
      });
 

        
    }
  }
  Parking.init({
    vehicle_id: DataTypes.STRING,
    parking_in: DataTypes.STRING,
    parking_out: DataTypes.STRING,
    price: DataTypes.INTEGER,
 
  }, {
    sequelize,
    modelName: 'Parking',
    hooks:   {
      beforeValidate:async (Parking,models)=>{
  
        
      var data = await  sequelize.models.Vehicle.findByPk(Parking.vehicle_id)
  
        var price = 0,
        rate_hour = data.rate_hour,
        rate_day = data.rate_day,
        total_second_in=0,
        total_second_out=0,
        total_second=0,
        parking_total_second=0,
        parking_total_minute=0,
        parking_total_hour=0,
        parking_total_day=0,
        parking_total_month=0,
        parking_total_year=0,
       
        parking_in= new Date(Parking.parking_in),
        parking_out= new Date(Parking.parking_out)
  
      
  
        // year to second
        total_second_in += parking_in.getFullYear() * 365 * 24 * 60 * 60
        total_second_out += parking_out.getFullYear() * 365 * 24 * 60 * 60

        // month to second 
        total_second_in += parking_in.getMonth() * 30  *  24 * 60 * 60
        total_second_out += parking_out.getMonth() * 30 *  24 * 60 * 60

        // day to second
        total_second_in += parking_in.getDate() *  24 * 60 * 60
        total_second_out += parking_out.getDate() *  24 * 60 * 60
        
        // hour to second
        total_second_in += parking_in.getHours() *    60 * 60
        total_second_out += parking_out.getHours() *    60 * 60

        // minute to second

        total_second_in += parking_in.getMinutes() * 60
        total_second_out += parking_out.getMinutes() * 60
      

        // add second to second
        total_second_in += parking_in.getSeconds()  
        total_second_out += parking_out.getSeconds() 
   
 
        // get parking total in second
        total_second = total_second_out - total_second_in
        // parking_total_second = 



        // get parking total in second
        parking_total_second = Math.floor(total_second % 3600 % 60   )

        // get parking total in minute
        parking_total_minute = Math.floor(total_second % 3600 / 60 )
        
        // get parking total in hour
        parking_total_hour = Math.floor(total_second  / 3600 % 24);
       
        // get parking total in day
        // 1 day = 86400 second
        parking_total_day = Math.floor(total_second / 86400 % 365 % 30);
       
        // get parking total in month
        parking_total_month = Math.floor(total_second / 86400 % 365 / 30);
       
        // get parking total in year
        parking_total_year = Math.floor(total_second / 86400 / 365);

        
 
        // console.log("all      >>", rate_hour);
        // console.log("second   >>",parking_total_second);
        // console.log("minute   >>",parking_total_minute);
        // console.log("hour     >>",parking_total_hour);
        // console.log("day      >>",parking_total_day);
        // console.log("month    >>",parking_total_month);
        // console.log("year     >>",parking_total_year);
        
         
       
        Parking.price = getPrice({rate_hour,rate_day},total_second)
   
        
      },
    
    },
   
    
  })

 
  return Parking;
};
