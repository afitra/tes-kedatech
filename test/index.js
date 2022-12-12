const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
const app = require("../app")
const fs = require("fs")

chai.use(chaiHttp)
describe("API ENDPOINT TESTING", () => {
    it("GET ALL PARKING DATA", (done) => {
      //  ======>    cek api landing-page
      chai
        .request(app)
        .get("/api/parking")
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("status")
            expect(res.body.status).to.be.an("string")
            expect(res.body).to.have.property("message")
            expect(res.body.message).to.be.an("string")
            expect(res.body).to.have.property("parking")
            expect(res.body.parking).to.be.an("object")
            expect(res.body.parking).to.have.all.keys(
              "count",
              "rows"
            )
            expect(res.body.parking.count).to.have.an("number")
            expect(res.body.parking.rows).to.have.an("array")
            expect(res.body).to.have.property("pagination")
            expect(res.body.pagination).to.have.an("boolean")
            expect(res.body).to.have.property("page")
            expect(res.body.page).to.have.an("number")
            expect(res.body).to.have.property("query")
            expect(res.body.query).to.have.an("object")
            expect(res.body.query).to.have.all.keys(
              "limit",
              "page"
            )
            done();
        });
    })

    it("POST PARKING", (done) => {
 
 
      const dataSample = {
        vehicle_id:'1',
        parking_in:'2022-02-02T02:02',
        parking_out:'2022-02-03T02:02'
      }
      chai
        .request(app)
        .post("/api/parking")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(dataSample)
        .end((err, res) => {
 
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.property("status")
          expect(res.body.status).to.be.an("string")
          expect(res.body).to.have.property("message")
          expect(res.body.message).to.be.an("string")
          expect(res.body).to.have.property("parking")
          expect(res.body.parking).to.be.an("object")
          expect(res.body.parking).to.have.all.keys(
            "id",
            "vehicle_id",
            'parking_in',
            'parking_out',
            'price',
            'updatedAt',
            'createdAt'
          )
       
          done()
        })
    })

    it("PUT PARKING", (done) => {
 
 
      const dataSample = {
        vehicle_id:'1',
        parking_in:'2022-02-02T02:02',
        parking_out:'2022-02-03T02:02'
      }
      var paramsId = 25

      chai
        .request(app)
        .put(`/api/parking/${paramsId}`)
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(dataSample)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.property("status")
          expect(res.body.status).to.be.an("string")
          expect(res.body).to.have.property("message")
          expect(res.body.message).to.be.an("string")
          expect(res.body).to.have.property("parking")
          expect(res.body.parking).to.be.an("object")
          expect(res.body.parking).to.have.all.keys(
            "id",
            "vehicle_id",
            'parking_in',
            'parking_out',
            'price',
            'updatedAt',
            'createdAt'
          )
       
          done()
        })
    })

    it("DELETE PARKING", (done) => {
  
      var paramsId = 39

      chai
        .request(app)
        .delete(`/api/parking/${paramsId}`)
        .set("Content-Type", "application/x-www-form-urlencoded")
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an("object")
          expect(res.body).to.have.property("status")
          expect(res.body.status).to.be.an("string")
          expect(res.body).to.have.property("message")
          expect(res.body.message).to.be.an("string")
          done()
        })
    })
   
    it("Search PARKING DATA", (done) => {
      //  ======>    cek api landing-page
      chai
        .request(app)
        .get("/api/parking")
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an("object")
            expect(res.body).to.have.property("status")
            expect(res.body.status).to.be.an("string")
            expect(res.body).to.have.property("message")
            expect(res.body.message).to.be.an("string")
            expect(res.body).to.have.property("parking")
            expect(res.body.parking).to.be.an("object")
            expect(res.body.parking).to.have.all.keys(
              "count",
              "rows"
            )
            expect(res.body.parking.count).to.have.an("number")
            expect(res.body.parking.rows).to.have.an("array")
            expect(res.body).to.have.property("pagination")
            expect(res.body.pagination).to.have.an("boolean")
             
            done();
        });
    })
  })
  