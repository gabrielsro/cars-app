const Version = require("../../models/version");
const { variantInfoGetter } = require("./carInfoAPI");

exports.createVersion = async (makeId, modelId, modelYear, reqBodyVariant) => {
  const variantInfo = await variantInfoGetter(reqBodyVariant.split(",")[2]);
  //Process fuel economy:
  let variantEconomy;
  if (
    variantInfo.model_mpg_hwy &&
    variantInfo.model_mpg_mixed &&
    variantInfo.model_mpg_city
  ) {
    variantEconomy = [
      variantInfo.model_mpg_hwy,
      variantInfo.model_mpg_mixed,
      variantInfo.model_mpg_city,
    ];
    variantEconomy.sort();
  }

  //Process fuel type:
  let fuelType = "Other";
  if (
    /\b(gasoline|premium|unleaded|regular)\b/i.test(
      variantInfo.model_engine_fuel
    )
  ) {
    fuelType = "Gasoline";
  }
  if (/\bdiesel\b/i.test(variantInfo.model_engine_fuel)) {
    fuelType = "Diesel";
  }
  if (/\bhybrid\b/i.test(variantInfo.model_engine_fuel)) {
    fuelType = "Hybrid";
  }

  if (
    /(?!\bhybrid\b).*\belectric\b.*(?!.*\bhybrid\b)/i.test(
      variantInfo.model_engine_fuel
    )
  ) {
    fuelType = "Electric";
  }

  //Process body:
  let body = "Unspecified";
  if (
    /\b(automobiles*|hatchbacks*|roadsters*|seaters*|two|coupe|sedan|wagons*|compacts*|mini|convertibles*|cars*)\b/i.test(
      variantInfo.model_body
    )
  ) {
    body = "Automobile";
  }
  if (/\bvan\b/i.test(variantInfo.model_body)) {
    body = "Van";
  }

  if (/\b(trucks*|bed|pick)\b/i.test(variantInfo.model_body)) {
    body = "Truck";
  }

  if (/\b(suv|sport\sutilit.*\svehicles*)\b/i.test(variantInfo.model_body)) {
  }

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
    body: body,
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
    fuel: fuelType,
    fuelSpecifics: variantInfo.model_engine_fuel,
    fuelEfficiencyHgw: variantEconomy[2],
    fuelEfficiencyMixed: variantEconomy[1],
    fuelEfficiencyCity: variantEconomy[0],
    accel0To100: variantInfo.model_0_to_100_kph,
    maxSpeed: variantInfo.model_top_speed_kph,
    length: variantInfo.model_length_mm,
    width: variantInfo.model_width_mm,
    height: variantInfo.model_height_mm,
    cars: [],
  });
};
