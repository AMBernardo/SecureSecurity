const employee = require("../models/employee");



// Defining methods for the booksController
module.exports = {
  find: function(req, res) {
    let x = req.params.UserToken
    let y = x.split(" ")[1]
    // console.log(y)
    employee   
      .find({"UserToken":  y })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    let x = req.params.id
    let y = x.split(" ")[1]
    console.log(y)
    employee
      .findById(y)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body)
    employee
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log(req.body)
    console.log()
    let z = req.body 
    employee
      .findOneAndUpdate({ _id: req.params.id}, {$set: z })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    employee
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAll: function(req, res) {
    const employeeList = [];
    employee
      .find(req.query)
      
      .then(dbModel => {
        //get all names and insert to employeeList array
        dbModel.forEach( (employee) => {
          employeeList.push(employee.name)
        })

        // respond all name of users
        res.json(employeeList)
        
      })
      .catch(err => res.status(422).json(err));
  },
  findByName: function(req, res) {
    // let z = req.params

    employee   
      .find(req.body.name)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
 
};