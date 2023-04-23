const express = require("express");
const router = express.Router();

const carController = require("../controllers/car-controller");
const makeController = require("../controllers/make-controller");
const modelController = require("../controllers/model-controller");
const versionController = require("../controllers/version-controller");

//Car Routes
router.get("/", carController.index);
router.get("/add-car", carController.add_car_get);
router.post("/add-car/get-models", carController.add_car_get_models_post);
router.post("/add-car/get-variants", carController.add_car_get_variants_post);
router.post("/add-car/form-submission", carController.add_car_variants_submit);
router.get("/car/:id", carController.carDetail);
router.get("/car/:id/update", carController.carUpdate);
router.get("/car/:id/delete", carController.carDelete);
router.get("/cars", carController.car_list);

//Make Routes
router.get("/make/:id", makeController.makeDetail);
router.get("/make/:id/delete", makeController.makeDelete);
router.get("/make/:id/update", makeController.makeUpdate);
router.get("/add-make", makeController.addMakeGet);
router.post("/add-make", makeController.addMakePost);
router.get("/makes", makeController.makeList);

//Version Routes
router.get("/versions", versionController.versionList);

//Model Routes
router.get("/year", modelController.yearFormGet);
router.post("/year/yearFormPost", modelController.yearFormPost);
router.get("/add-model", modelController.addModelGet);
router.post("/add-model", modelController.addModelPost);
router.post("/add-model/final", modelController.addModelPostFinal);
router.get(
  "/model/model-page/:makeId/:modelNameFormatted",
  modelController.modelPage
);
router.get("/model/:id", modelController.modelDetail);
router.get("/models", modelController.modelList);

module.exports = router;
