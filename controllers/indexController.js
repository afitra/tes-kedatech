// const Model = require("../models")
const {
Parking,
Vehicle
} = require("../models")
module.exports = {
    showdata: async (req, res) => {
      try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
        const alert = { message: alertMessage, status: alertStatus }
        let parking = await Parking.findAll()
        res.send(parking)
        // res.render("page/view_data", {
        //     title: "AMB | Dashboard",
        //     alert,
        //   })
      } catch (err) {
        console.log("nooooo");
        // res.redirect("/admin/signin")
        res.send(err.message)
      }
    },
    viewAddData: async (req, res) => {
      try {
        const alertMessage = req.flash("alertMessage")
        const alertStatus = req.flash("alertStatus")
        const alert = { message: alertMessage, status: alertStatus }
        res.render("page/add_data", {
            alert,
            title: "AMB | Category",
        
          })
      } catch (err) {
        console.log("nooooo");
        // res.redirect("/admin/signin")
        res.send(err.message)
      }
    },
  
   
  }