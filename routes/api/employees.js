const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");

// Matches with ""
router.route("/")
  .get(employeeController.findAll)
  // .get(employeeController.findByName)
  .post(employeeController.create);

  

 // employee/:Usertoken/
router.route("/:UserToken")
  .get(employeeController.find)
  

module.exports = router;