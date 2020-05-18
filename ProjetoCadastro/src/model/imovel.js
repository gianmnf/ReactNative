import Usuario from './usuario';

export default class Imovel {
  idImovel: int;
  descricaoImovel: String;
  email: String;
  logradouroImovel: String;
  numero: int;
  complemento: String;
  bairro: String;
  cidade: String;
  cep: int;
  uf: String;
  idUsuario: int;
  usuario: Usuario;
  situacaoImovel: String;
  constructor() {
    this.idImovel = 0;
    this.descricaoImovel = '';
    this.email = '';
    this.logradouroImovel = '';
    this.numero = 0;
    this.complemento = '';
    this.bairro = '';
    this.cidade = '';
    this.cep = 0;
    this.uf = '';
    this.idUsuario = 0;
    this.usuario = new Usuario();
    this.situacaoImovel = '';
  }
}
