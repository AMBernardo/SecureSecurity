const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");

// Matches with "/api/books"
router.route("/")
  .post(employeeController.create);
 // api/employee/:Usertoken/:Usertoken
router.route("/:UserToken")
  .get(employeeController.find)
  


// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(employeeController.findById)
  .put(employeeController.update)
  .delete(employeeController.remove);

module.exports = router;