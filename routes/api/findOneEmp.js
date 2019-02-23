const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");


  router.route("/findOneEmp")
  .get(employeeController.findByName);

  

module.exports = router;