const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");

router
  .route("/:id")
  .get(employeeController.findById)
  .delete(employeeController.remove)
  .put(employeeController.update);

module.exports = router;