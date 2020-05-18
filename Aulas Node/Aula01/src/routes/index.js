const express = require("express");

const routes = express.Router();

const usuarioController = require('../controllers/usuarioController');

routes.get("/usuario", usuarioController.index);

module.exports = routes;