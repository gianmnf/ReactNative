export default class Imovel {
  descricaoImovel: string;
  email: string;
  logradouro: string;
  numero: number;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
  usuario: String;
  situacaoImovel: string;

  constructor() {
    this.descricaoImovel = '';
    this.email = '';
    this.logradouro = '';
    this.numero = 0;
    this.complemento = '';
    this.cep = '';
    this.bairro = '';
    this.cidade = '';
    this.uf = '';
    this.usuario = '';
    this.situacaoImovel = '';
  }
}
