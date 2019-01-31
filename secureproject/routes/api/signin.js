const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");

// Matches with "/api/books"
router.route("/")
  .post(employeeController.createUser);


module.exports = router;