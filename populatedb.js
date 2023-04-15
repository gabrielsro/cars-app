#! /usr/bin/env node

console.log(
  'This script populates some test cars, makes, models and versions to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

//Getting access to models (collections)
const Car = require("./models/car");
const Version = require("./models/version");
const Model = require("./models/model");
const Make = require("./models/make");

//Temporary storage of refs for documents that need them
const cars = [];
const versions = [];
const models = [];
const makes = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7. Let's see if this is a deal breaker

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createMakes();
  await createVersions();
  await createModels();
  await createCars();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

//Functions that directly save each document to mongodb
async function versionCreate(year, type, energy) {
  const version = new Version({ year: year, type: type, energy: energy }); //document creation
  await version.save(); //save is a document prototype method
  versions.push(version); //saving doc temporarily so it can be used for creating docs that need it as ref
  console.log(`Added version ${version}`);
}

async function makeCreate(name, country) {
  const make = new Make({ name: name, country: country });
  await make.save();
  makes.push(make);
  console.log(`Added make ${name}`);
}

async function modelCreate(name, make, version) {
  const model = new Model({ name: name, make: make });
  if (version != false) model.version = version;
  await model.save();
  models.push(model);
  console.log(`Added model ${model.make} ${model.name}`);
}

async function carCreate(
  make,
  model,
  price,
  mileage,
  status,
  color,
  description,
  version
) {
  const car = new Car({
    make: make,
    model: model,
    price: price,
    mileage: mileage,
    status: status,
    color: color,
    version: version,
  });
  if (description != false) car.description = description;
  await car.save();
  cars.push(car);
  console.log(`Added car $${price} ${color} ${version}`);
}

//Functions that start the creation of dummy content
async function createMakes() {
  console.log("Adding Makes");
  await makeCreate("BMW", "Germany");
  await makeCreate("Dodge", "USA");
  await makeCreate("Hyundai", "South Korea");
  await makeCreate("Nissan", "Japan");
}

async function createVersions() {
  console.log("Adding Versions");
  await versionCreate(2006, "Automobile", "Gas");
  await versionCreate(2020, "SUV", "Gas");
  await versionCreate(2023, "Truck", "Gas");
  await versionCreate(2014, "Automobile", "Gas");
  await versionCreate(2019, "Automobile", "Gas");
  await versionCreate(2013, "SUV", "Gas");
  await versionCreate(1998, "Automobile", "Gas");
}

async function createModels() {
  console.log("Adding Models");
  await modelCreate("M3 E46", makes[0], versions[0]);
  await modelCreate("X6", makes[0], versions[1]);
  await modelCreate("RAM TRX", makes[1], versions[2]);
  await modelCreate("Elantra GT", makes[2], versions[3]);
  await modelCreate("Sonata SE", makes[2], versions[4]);
  await modelCreate("Patrol Y62", makes[3], versions[5]);
  await modelCreate("Skyline R33", makes[3], versions[6]);
}

async function createCars() {
  console.log("Adding Cars");
  await Promise.all([
    carCreate(
      makes[0],
      models[0],
      42000,
      65000,
      "Available",
      "White",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      versions[0]
    ),
    carCreate(
      makes[0],
      models[1],
      60000,
      80000,
      "Available",
      "Black",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      versions[1]
    ),
    carCreate(
      makes[1],
      models[2],
      88000,
      710,
      "Available",
      "Yellow",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      versions[2]
    ),
    carCreate(
      makes[2],
      models[3],
      8500,
      170000,
      "Available",
      "Black",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      versions[3]
    ),
    carCreate(
      makes[2],
      models[4],
      11000,
      110000,
      "Available",
      "Red",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      versions[4]
    ),
    carCreate(
      makes[3],
      models[5],
      20000,
      51000,
      "Available",
      "Silver",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      versions[5]
    ),
    carCreate(
      makes[3],
      models[6],
      73000,
      98000,
      "Available",
      "White",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      versions[6]
    ),
  ]);
}
