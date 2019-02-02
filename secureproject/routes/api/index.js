const router = require("express").Router();
const employeeRoutes = require("./employees");
const signupRoutes = require("./signin");
const signinRoutes = require("./signinReal");
const verify = require("./verify");


// Book routes
router.use("/employee", employeeRoutes);

router.use("/account/signup", signupRoutes);

router.use("/account/signin", signinRoutes);

router.use("/account/verify", verify);

router.use("/account/logout", verify);






module.exports = router;
