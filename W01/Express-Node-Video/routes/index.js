const express = require("express");
const router = express.Router();
const lesson1Controller = require("../controllers/lesson1")


router.get("/", lesson1Controller.bestRoute);

router.get("/hannah", lesson1Controller.hannaRoute);

router.get("/sarah", lesson1Controller.sarahRoute);


module.exports = router;