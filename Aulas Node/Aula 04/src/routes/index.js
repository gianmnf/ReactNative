const express = require("express");

const routes = express.Router();

const usuarioController = require('../controllers/usuarioController');

const authMiddlesware = require("../middlewares/auth");

routes.get("/usuario", usuarioController.index);
routes.post("/usuario", usuarioController.store);
routes.post("/usuario/autenticar",usuarioController.findByIdeUsuarioSenha);

routes.use(authMiddlesware);

routes.put("/usuario/:id", usuarioController.update);
routes.get("/usuario/:id",usuarioController.findById);

module.exports = routes;