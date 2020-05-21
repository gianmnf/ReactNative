var Usuario = require("../models/usuario");

class UsuarioController {
  async index(req, res) {
    res.send("O Controlador de usuários está funcionando corretamente");
  }

  async store(req, res) {
    console.log(req.body);
    const usuario = await Usuario.create({ ...req.body });
    return res.json(usuario);
  }

  async findById(req, res) {
    const usuario = await Usuario.findById(req.params.id);

    if (!usuario) {
      return res.status(400).json({ error: "Id inexistente" });
    }

    return res.json(usuario);
  }

  async findByIdeUsuarioSenha(req, res) {
    const { IdeUsuario, SenhaUsuario } = req.body;

    const usuario = await Usuario.findOne({ IdeUsuario: IdeUsuario });

    if (!usuario) {
      return res.status(400).json({ error: "Usuário1 ou senha inválido" });
    }

    var retorno = await usuario.compareHash(SenhaUsuario);
    if (!retorno) {
      return res.status(400).json({ error: "Usuário2 ou senha inválido" });
    }

    return res.json({usuario, token: Usuario.generationToken(usuario) });
  }

  async update(req, res) {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(usuario);
  }
}
module.exports = new UsuarioController();