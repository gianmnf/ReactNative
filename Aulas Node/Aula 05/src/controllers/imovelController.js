var Imovel = require("../models/imovel");

class ImovelController {
  async index(req, res) {
    res.send("O Controlador de imóveis está funcionando corretamente");
  }

  async store(req, res) {
    console.log(req.body);
    const imovel = await Imovel.create({ ...req.body, Usuario: req.userId });
    return res.json(imovel);
  }

  async findById(req, res) {
    const imovel = await Imovel.findById(req.params.id);

    if (!imovel) {
      return res.status(400).json({ error: "Id inexistente" });
    }

    return res.json(imovel);
  }

  async update(req, res) {
    const imovel = await Imovel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      Usuario: req.userId,
    });
    return res.json(imovel);
  }

  async delete(req, res) {
    const ID = req.params.id;
    const imovel = await Imovel.deleteOne({ _id: `${ID}` });
    return res.json(imovel);
  }
}
module.exports = new ImovelController();