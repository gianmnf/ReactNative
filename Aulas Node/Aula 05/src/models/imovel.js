const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Schema = mongoose.Schema;
let ImovelSchema = new Schema({
  DescricaoImovel: {
    type: String,
    required: true,
    max: 200,
  },
  EMail: {
    type: String,
    required: true,
    max: 100,
  },
  Logradouro: {
    type: String,
    required: true,
    max: 100,
  },
  Numero: {
    type: Number,
    required: true
  },
  Complemento: {
    type: String,
    required: false,
    max: 100,
  },
  Bairro: {
    type: String,
    required: true,
    max: 50,
  },
  Cidade: {
    type: String,
    required: true,
    max: 50,
  },
  Cep: {
    type: String,
    required: true,
    max: 9,
  },
  Uf: {
    type: String,
    required: true,
    max: 2,
  },
  Usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ImovelSchema.plugin(mongoosePaginate);

// Exportar o modelo
module.exports = mongoose.model("Imovel", ImovelSchema);