const express = require("express");
const router = express();
const ChatRoute = require("./Modules/Chat/route.js");
const TaskManagerRoute = require("./Modules/Task Manager/routes.js");
const ECommerceRoute = require("./Modules/ECommerce/routes.js");

router.use("/Chat", ChatRoute);
router.use("/Task", TaskManagerRoute);
router.use("/Shop", ECommerceRoute);

module.exports = router;

