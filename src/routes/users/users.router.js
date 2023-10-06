const express = require("express");
const service = require("./users.service");
const { control, getBody, guardUser } = require("../../middleware");

/**
 * Defines the routes for the users endpoint.
 * Guards some routes requiring a user to be logged in.
 * Adds a middleware to extract args from the request.
 * Wires each route with its service function.
 */
const router = express.Router();

router
  .get("/:id", guardUser, control(service.readById))
  .post("/", getBody, control(service.register))
  .post("/register", getBody, control(service.register))
  .post("/login", getBody, control(service.login));

module.exports = router;
