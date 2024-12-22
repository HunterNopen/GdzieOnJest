const express = require("express");
const busController = require("../controllers/busController");

const router = express.Router();

router.get("/", busController.searchBuses);

module.exports = router;
