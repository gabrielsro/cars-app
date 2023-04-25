const Version = require("../../models/version");
const { variantInfoGetter } = require("./carInfoAPI");

exports.createVersion = async (makeId, modelId, modelYear, reqBodyVariant) => {
  let variantInfo = await variantInfoGetter(reqBodyVariant.split(",")[2]);
  let bodyType;
  //for Automobile
  //for SUV
  //for Truck
  //for Van
  let fuel;
  //for Gasoline
  //for Diesel
  //for Electric
  //for Hybrid
  //for Natural Gas
  let weightFixed;
  let effFixed;
  let compressionFixed;
  return new Version({
    name: reqBodyVariant.split(",")[1],
    model: modelId,
    make: makeId,
    year: modelYear,
    versionNumber: reqBodyVariant.split(",")[2],
    versionBodyType: variantInfo.model_body,
    enginePosition: variantInfo.model_engine_position,
    engineCC: variantInfo.model_engine_cc,
    engineCyl: variantInfo.model_engine_cyl,
    engineType: variantInfo.model_engine_type,
    engineTorqueNm: variantInfo.model_engine_torque_nm,
    enginePower: variantInfo.model_engine_power_hp,
    engineCompression: variantInfo.model_engine_compression,
    drive: variantInfo.model_drive,
    transmission: variantInfo.model_transmission_type,
    weight: variantInfo.model_weight_kg,
    fuelSpecifics: variantInfo.model_engine_fuel,
    fuelEfficiencyHgw: variantInfo.model_mpg_hwy,
    fuelEfficiencyMixed: variantInfo.model_mpg_mixed,
    fuelEfficiencyCity: variantInfo.model_mpg_city,
    cars: [],
  });
};
