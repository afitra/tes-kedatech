// const Model = require("../models")
const {
Parking,
Vehicle
} = require("../models")
const date = require('date-and-time')
const { Op } = require("sequelize");
const { formatRupiah } = require('../helpers/getPrice')
module.exports = {
    showdashboard: async (req, res) => {
      try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
        const alert = { message: alertMessage, status: alertStatus }
        res.render('page/dashboard',{
          title: "AMB | Dashboard",
          alert
        });
      } catch (err) {
  
 
        res.send(err.message)
      }
    },
    searchData: async (req,res)=>{
      try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
        const alert = { message: alertMessage, status: alertStatus }
        let vehicle = await Vehicle.findAll()
        var queryLimit = req.query.limit ? req.query.limit : 3
        var queryPage = req.query.page ? req.query.page : 1
        var offset= 1
     
        if(queryPage==1){
          offset = 0
        }else{
          offset = Number(queryLimit) *( Number(queryPage) -1)
        }
        var costomQuery = {}
        if (req.body.vehicle ){
          costomQuery['vehicle_id'] = req.body.vehicle
        }
    
      
        if(req.body.price_start && req.body.price_end == ""){
          costomQuery['price'] = {
            [Op.gte]: req.body.price_start
          }
        }
        if(req.body.price_start == "" && req.body.price_end){
          costomQuery['price'] = {
            [Op.lte]: req.body.price_end
          }
        }
        if(req.body.price_start  && req.body.price_end){
          costomQuery['price'] = {
            [Op.between]:[ req.body.price_start, req.body.price_end]
          }
        }

        var parking_in = date.format(new Date(req.body.parking_in),'DD/MM/YYYY HH:mm:ss');
        var parking_out = date.format(new Date(req.body.parking_out),'DD/MM/YYYY HH:mm:ss');
      

        if(req.body.parking_in && req.body.parking_out ==""){
   
          costomQuery ['parking_in']= parking_in
        }
        if(req.body.parking_in == "" && req.body.parking_out){
         
          costomQuery['parking_out'] = parking_out
        }
        if(req.body.parking_in  && req.body.parking_out){
    
          costomQuery ['parking_in']= parking_in 
          costomQuery ['parking_out']= parking_out 
          
        }
 
      
        
        let parking = await Parking.findAndCountAll({
          order: [["id", "DESC"]],
         
          include: 
              [{
                model: Vehicle,
                as: "vehicle",
              }],
         where: costomQuery
        })
        for (let i = 0; i < parking.rows.length; i++) {
          var temp = JSON.parse(JSON.stringify(parking.rows[i]));
          temp.priceFormat=formatRupiah( String(parking.rows[i].price),"RP");
          parking.rows[i]= temp
        }
     
        
        
        var page = Math.round(parking.count/queryLimit)
      
        if(parking.count%queryLimit !== 0){
          page ++
        }
 
        res.render("page/view_data", {
          title: "AMB | show",
          alert,
          parking,
          pagination:false,
          vehicle,page, query:{limit:queryLimit, page:queryPage}
        })
      } catch (err) {
        res.send(err.message)
      }
    },
    showdata: async (req, res) => {
      try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
        const alert = { message: alertMessage, status: alertStatus }
        let vehicle = await Vehicle.findAll()
        var queryLimit = req.query.limit ? req.query.limit : 3
        var queryPage = req.query.page ? req.query.page : 1
        var offset= 1
        if(queryPage==1){
          offset = 0
        }else{
          offset = Number(queryLimit) *( Number(queryPage) -1)
        }
 
       
        let parking = await Parking.findAndCountAll({
            order: [["id", "DESC"]],
            offset ,
            limit: Number(queryLimit) ,
            include: 
                [{
                  model: Vehicle,
                  as: "vehicle",
                }],   
        })
        for (let i = 0; i < parking.rows.length; i++) {
          var temp = JSON.parse(JSON.stringify(parking.rows[i]));
         temp.priceFormat=formatRupiah( String(parking.rows[i].price),"RP");
          parking.rows[i]= temp
        }
     
        
        
        var page = Math.round(parking.count/queryLimit)
      
        if(parking.count%queryLimit !== 0){
          page ++
        }
        
        res.render("page/view_data", {
            title: "AMB | show",
            alert,
            parking,
            pagination:true,
            vehicle,page, query:{limit:queryLimit, page:queryPage}
          })
           
      } catch (err) {
  
 
        res.send(err.message)
      }
    },
    viewAddData: async (req, res) => {
      try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
        const alert = { message: alertMessage, status: alertStatus }
        let vehicle = await Vehicle.findAll()
      
        res.render("page/add_data", {
            alert,
            title: "AMB | Add",
            vehicle
        
          })
      } catch (err) {
        res.send(err.message)
      }
    },
    actionAddData:async (req, res) => {
        try {
            var { vehicle_id,parking_in,parking_out} = req.body
            parking_in =   date.format(new Date(parking_in),'DD/MM/YYYY HH:mm:ss');
            parking_out=   date.format(new Date(parking_out),'DD/MM/YYYY HH:mm:ss');
            var parking =  await Parking.create({vehicle_id,parking_in,parking_out })
  
          
           res.redirect('/show')
        
        } catch (err) {
            res.send(err.message)
        }
    },
    editParking:async (req, res) => {
        try {
       
            const { id,vehicle_id,parking_in,parking_out} = req.body
          
            var parking = await Parking.findOne({
    
                where:{
                    id
                }
            })
            parking.vehicle_id=vehicle_id
            parking.parking_in= date.format(new Date(parking_in),'DD/MM/YYYY HH:mm:ss');
            parking.parking_out= date.format(new Date(parking_out),'DD/MM/YYYY HH:mm:ss');
            parking.save({ fields: ['vehicle_id','parking_in','parking_out','price'] })
       
            res.redirect('/show')
        } catch (err) {
            res.send(err.message)
        }
    },
    deleteParking:async (req, res) => {
        try {
          
          await Parking.destroy({
            where: {
              id: req.params.id,
            },
          })
          res.redirect('/show')
        } catch (err) {
            res.send(err.message)
        }
    }
  
   
  }