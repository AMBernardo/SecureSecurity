const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");

// Matches with ""
router.route("/")
  .post(employeeController.create);
 // employee/:Usertoken/
router.route("/:UserToken")
  .get(employeeController.find)
  


// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(employeeController.findById)
  .put(employeeController.update)
  .delete(employeeController.remove);

module.exports = router;