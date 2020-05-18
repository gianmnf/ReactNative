var Usuario = require("../models/usuario");

class UsuarioController {
    async index(req,res) {
        res.send("O controlador de usuários está funcionando corretamente.");
    }
}
module.exports = new UsuarioController();