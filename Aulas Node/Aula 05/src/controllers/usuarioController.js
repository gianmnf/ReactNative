var Usuario = require("../models/usuario");

class UsuarioController {
  async index(req, res) {
    res.send("O Controlador de usuários está funcionando corretamente");
  }

  async store(req, res) {
    console.log('O meu body:',req.body);
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

    console.log('O que estou recebendo: ', req.body.IdeUsuario);

    const usuario = await Usuario.findOne({ IdeUsuario: IdeUsuario });

    console.log('Usuario', usuario);

    if (!usuario) {
      return res.status(400).json({ error: "Usuário1 ou senha inválido" });
    }

    var retorno = await usuario.compareHash(SenhaUsuario);
    if (!retorno) {
      return res.status(400).json({ error: "Usuário2 ou senha inválido" });
    }

    return res.json({usuario, token: Usuario.generationToken(usuario) });
  }

  async update(req, res) {
    // const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    const usuario = await Usuario.findOne({ _id: req.params.id }, function (
      err,
      doc
    ) {
      doc.SenhaUsuario = req.body.SenhaUsuario;
      doc.NomeUsuario = req.body.NomeUsuario;
      doc.IdeUsuario = req.body.IdeUsuario;
      doc.EMail = req.body.EMail;
      doc.save();
      return doc;
    });

    return res.json(usuario);
  }
}
module.exports = new UsuarioController();