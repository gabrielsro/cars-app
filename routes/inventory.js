const express = require("express");
const router = express.Router();

const carController = require("../controllers/car-controller");
const makeController = require("../controllers/make-controller");
const modelController = require("../controllers/model-controller");
const unitController = require("../controllers/unit-controller");

//Car Routes
router.get("/", carController.index);
router.get("/add-car", carController.add_car_get);
router.post("/add-car", carController.add_car_post);
router.get("/year", carController.year);
router.get("/cars", carController.car_list);

//Make Routes
router.get("/add-make", makeController.addMakeGet);
router.post("/add-make");
router.get("/makes", makeController.makeList);

//Unit Routes
router.get("/add-unit", unitController.addUnitGet);
router.post("/add-unit");
router.get("/units", unitController.unitList);

//Model Routes
router.get("/add-model", modelController.addModelGet);
router.post("/add-model");
router.get("/models", modelController.modelList);

module.exports = router;
