const router = require("express").Router();
const employeeRoutes = require("./employees");
const signinRoutes = require("./signin");

// Book routes
router.use("/employee", employeeRoutes);


router.use("/account/signin", signinRoutes);


module.exports = router;
