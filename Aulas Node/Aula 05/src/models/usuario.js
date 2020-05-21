const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

const Schema = mongoose.Schema;
let UsuarioSchema = new Schema({
  NomeUsuario: {
    type: String,
    required: true,
    max: 100,
  },
  IdeUsuario: {
    type: String,
    required: true,
    max: 50,
  },
  SenhaUsuario: {
    type: String,
    required: true,
    max: 50,
  },
  EMail: {
    type: String,
    required: true,
    max: 200,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("SenhaUsuario")) {
    return next();
  }

  this.SenhaUsuario = await bcrypt.hash(this.SenhaUsuario, 8);
});

UsuarioSchema.methods = {
  compareHash(SenhaUsuario) {
    return bcrypt.compare(SenhaUsuario, this.SenhaUsuario);
  },
};

UsuarioSchema.statics = {
  generationToken({ _id, NomeUsuario }) {
    return jwt.sign({ _id, NomeUsuario }, authConfig.secret, {
      expiresIn: authConfig.ttl,
    });
  },
};

// Exportar o modelo
module.exports = mongoose.model("Usuario", UsuarioSchema);