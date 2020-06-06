const express = require("express");

const routes = express.Router();

const usuarioController = require('../controllers/usuarioController');
const imovelController = require('../controllers/imovelController');
const authMiddlesware = require("../middlewares/auth");

routes.get("/usuario", usuarioController.index);
routes.post("/usuario", usuarioController.store);
routes.post("/usuario/autenticar",usuarioController.findByIdeUsuarioSenha);


routes.use(authMiddlesware);

routes.put("/usuario/:id", usuarioController.update);
routes.get("/usuario/:id",usuarioController.findById);

//Rotas Imóvel
routes.post("/imovel", imovelController.store);
routes.get("/imovel/obter/:id", imovelController.findById);
routes.put("/imovel/:id", imovelController.update);
routes.delete("/imovel/:id", imovelController.delete);
routes.get("/imovel/findAll", imovelController.find);
routes.get("/imovel/findPaginate", imovelController.findPage);

module.exports = routes;