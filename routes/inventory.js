const express = require("express");
const router = express.Router();
const carController = require("../controllers/car-controller");
const makeController = require("../controllers/make-controller");
const modelController = require("../controllers/model-controller");
const versionController = require("../controllers/version-controller");
const searchController = require("../controllers/search-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/**
 * cloudinary section (Image handling):
 */
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

cloudinary.api.upload_preset("CarFast").then((result) => console.log(result));

router.get("/get-signature", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp: timestamp },
    process.env.CLOUDINARYSECRET
  );
  res.json({ timestamp, signature });
});

router.post("/check-pics", upload.none(), (req, res) => {
  const whitelist = [];
  const received = req.body.pic.map((picture) => {
    return JSON.parse(picture);
  });
  received.forEach((receivedPic) => {
    const expectedSignature = cloudinary.utils.api_sign_request(
      { public_id: receivedPic.public_id, version: receivedPic.version },
      process.env.CLOUDINARYSECRET
    );
    if (receivedPic.signature == expectedSignature) {
      whitelist.push(receivedPic.position);
    }
  });
  res.send(whitelist.join());
});

/**
 * App internal affairs:
 */

//Searchbar:
router.post("/fuzzy_search", searchController.fuzzySearch);

//Car Routes
router.get("/", carController.index);
router.get("/add-car", carController.add_car_get);
router.post("/add-car/get-models", carController.add_car_get_models_post);
router.post(
  "/add-car/get-models-model-change/:year/:make/:model/:mileage/:price/:color/:status",
  carController.add_car_get_variants_post_modelChange
);
router.post(
  "/add-car/get-models-more/:year/:make/:more",
  carController.add_car_get_models_more
);
router.post(
  "/add-car/get-models/:year/:make",
  carController.add_car_get_models_repost
);
router.post(
  "/add-car/get-models/:year/:make/:mileage/:color/:price",
  carController.add_car_get_models_repost
);
router.post("/add-car/get-variants", carController.add_car_get_variants_post);
router.post("/add-car/form-submission", carController.add_car_variants_submit);
router.get("/car/:id/update/:from", carController.carUpdate);
router.get("/car/:id/delete", carController.carDelete);
router.get("/cars", carController.car_list);
router.get("/car/:id", carController.carDetail);
router.post(
  "/car_version_update/:carId/:versionId/:carChange/:versionChange",
  carController.carAndVersionUpdate
);

//Make Routes
router.get("/make/:id", makeController.makeDetail);
router.get("/make/:id/delete", makeController.makeDelete);
router.get("/make/:id/update", makeController.makeUpdate);
router.get("/add-make", makeController.addMakeGet);
router.post("/add-make", makeController.addMakePost);
router.get("/makes", makeController.makeList);

//Version Routes
router.get("/versions", versionController.versionList);
router.get("/version/:versionId/", versionController.versionDetail);
router.get(
  "/version/:versionId/:modelId/:modelName/:makeId/delete",
  versionController.versionDelete
);

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
router.get("/model/:id/delete", modelController.modelDelete);
router.get(
  "/model/:modelNameFormatted/:makeId/deleteAll",
  modelController.modelDeleteAll
);
router.get("/models", modelController.modelList);

module.exports = router;
