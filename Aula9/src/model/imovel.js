export default class Imovel {
  idImovel: number;
  descricaoImovel: string;
  email: string;
  logradouroImovel: string;
  numero: number;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
  idUsuario: number;
  situacaoImovel: string;

  constructor() {
    this.idImovel = 0;
    this.descricaoImovel = '';
    this.email = '';
    this.logradouroImovel = '';
    this.numero = 0;
    this.complemento = '';
    this.cep = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
    this.idUsuario = 0;
    this.situacaoImovel = '';
  }
}
