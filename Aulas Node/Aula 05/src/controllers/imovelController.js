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
    const imovel = await Imovel.findById(req.params.id).populate("Usuario");

    if (!imovel) {
      return res.status(400).json({ error: "Id inexistente" });
    }

    return res.json(imovel);
  }

  async find(req, res) {
    const imoveis = await Imovel.find({ Usuario: req.userId }).populate(
      "Usuario"
    );

    if (!imoveis) {
      return res.status(400).json({ error: "Não existem imóveis" });
    }

    return res.json(imoveis);
  }

  async findPage(req, res) {
    try {
      const filters = {};

      filters.Usuario = req.userId;

      if (req.query.DescricaoImovel) {
        filters.DescricaoImovel = new RegExp(req.query.DescricaoImovel, "i");
      }

      const imoveis = await Imovel.paginate(filters, {
        page: req.query.page || 1,
        limit: 2,
        populate: ["Usuario"],
        sort: "-createdAt",
      });

      return res.json(imoveis);
    } catch (err) {
      return res.status(400).send(err);
    }
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