const express = require("express");
const DataController = require("../controllers/data");

const api = express.Router();

api.post("/data", DataController.sendData);
api.get('/data/:id', DataController.getData)

module.exports = api;
