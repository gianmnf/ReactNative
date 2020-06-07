import {call, put, select} from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';
import {ToastActionsCreators} from 'react-native-redux-toast';

/* import {
  incluirImovel,
  alterarImovel,
  excluirImovel,
  obterTodosImoveis,
} from '../../services/imovelService'; */

import ImovelActions from '../ducks/imovel';

import {post, putAxios, get, deleteAxios} from '../../services/api';

function* incluir(imovel) {
  const retorno = yield incluirImovel(imovel)
    .then(resp => {
      var ret = {
        tipo: 1,
        mensagem: '',
        imovel: resp,
      };

      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 2,
        mensagem: erro,
        imovel: null,
      };
      return ret;
    });
  return retorno;
}

function incluirImovel(imovel) {
  const data = {
    DescricaoImovel: imovel.descricaoImovel,
    EMail: imovel.email,
    Logradouro: imovel.logradouro,
    Numero: imovel.numero,
    Complemento: imovel.complemento,
    Cep: imovel.cep,
    Bairro: imovel.bairro,
    Cidade: imovel.cidade,
    Uf: imovel.uf,
    Usuario: imovel.usuario,
    SituacaoImovel: imovel.situacaoImovel,
  };

  return new Promise((resolve, reject) => {
    post('/imovel', 'COM_TOKEN_USUARIO', data, 'S')
      .then(response => {
        console.tron.log('Minha response: ', response);
        var retorno = {
          tipo: '1',
          imovel: response.data.imovel,
          token: response.data.token,
        };
        console.tron.log('Isso é o que recebo: ', retorno);
        resolve(retorno);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}

function alterarImovel(imovel) {
  const data = {
    DescricaoImovel: imovel.descricaoImovel,
    EMail: imovel.email,
    Logradouro: imovel.logradouro,
    Numero: imovel.numero,
    Complemento: imovel.complemento,
    Cep: imovel.cep,
    Bairro: imovel.bairro,
    Cidade: imovel.cidade,
    Uf: imovel.uf,
    Usuario: imovel.usuario,
    SituacaoImovel: imovel.situacaoImovel,
  };

  return new Promise((resolve, reject) => {
    putAxios(`/imovel/${imovel._id}`, 'COM_TOKEN_USUARIO', data, 'S')
      .then(response => {
        console.tron.log('Minha response: ', response);
        var retorno = {
          tipo: '1',
          imovel: response.data.imovel,
          token: response.data.token,
        };
        console.tron.log('Isso é o que recebo: ', retorno);
        resolve(retorno);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}

function* alterar(imovel) {
  const retorno = yield alterarImovel(imovel)
    .then(resp => {
      var ret = {
        tipo: 1,
        mensagem: '',
        imovel: resp,
      };

      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 2,
        mensagem: erro,
        imovel: null,
      };
      return ret;
    });
  return retorno;
}

function excluirImovel(imovel) {
  console.tron.log('Checando Exclusão: ', imovel);
  return new Promise((resolve, reject) => {
    deleteAxios(`/imovel/${imovel}`, 'COM_TOKEN_USUARIO')
      .then(response => {
        var retorno = {
          tipo: '1',
          usuario: response.data.usuario,
          imovel: response.data.imovel,
          token: response.data.token,
        };
        console.log('Dados Imóveis:', response);
        resolve(retorno);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}

function* deletar(imovel) {
  const retorno = yield excluirImovel(imovel._id)
    .then(resp => {
      var ret = {
        tipo: 1,
        mensagem: '',
        imovel: resp,
      };

      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 2,
        mensagem: erro,
        imovel: null,
      };
      return ret;
    });
  return retorno;
}

/* Função para deletar um imóvel */
export function* deletarImovel(action) {
  try {
    const {isConnected} = yield NetInfo.fetch();
    if (isConnected) {
      ToastActionsCreators.displayInfo('Deletando Imóvel');
      var retorno = yield deletar(action.imovel);
      if (retorno.tipo === 1) {
        yield apresentarMensagem(
          3,
          retorno.imovel,
          'Imóvel deletado com sucesso',
        );
        return;
      } else {
        yield apresentarMensagem(1, action.imovel, retorno.mensagem);
        return;
      }
    } else {
      yield apresentarMensagem(1, action.imovel, 'Sem conexão com internet');
    }
  } catch (err) {
    yield apresentarMensagem(1, action.imovel, err.message);
    return;
  }
}

/* Função para manter um imóvel */
export function* manterImovel(action) {
  try {
    const {isConnected} = yield NetInfo.fetch();
    if (isConnected) {
      var mensagemErro = yield consistirDadosImovel(action.imovel);
      if (mensagemErro !== '') {
        yield apresentarMensagem(1, action.imovel, mensagemErro);
        return;
      }

      if (action.operacao === 'C') {
        ToastActionsCreators.displayInfo('Incluindo Imóvel');
        var retorno = yield incluir(action.imovel);
        if (retorno.tipo === 1) {
          yield apresentarMensagem(
            2,
            retorno.imovel,
            'Inclusão efetuada com sucesso',
          );
          return;
        } else {
          yield apresentarMensagem(1, action.imovel, retorno.mensagem);
          return;
        }
      } else if (action.operacao === 'A') {
        ToastActionsCreators.displayInfo('Atualizando Imóvel');
        var retorno = yield alterar(action.imovel);
        if (retorno.tipo === 1) {
          yield apresentarMensagem(
            2,
            retorno.imovel,
            'Alteração efetuada com sucesso',
          );
          return;
        } else {
          yield apresentarMensagem(1, action.imovel, retorno.mensagem);
          return;
        }
      }
    } else {
      yield apresentarMensagem(1, action.imovel, 'Sem conexão com internet');
    }
  } catch (err) {
    yield apresentarMensagem(1, action.imovel, err.message);
    return;
  }
}

function* apresentarMensagem(tipo, imovel, mensagem) {
  ('Dentro do apresentar mensagem');
  console.tron.log(tipo);
  if (tipo === 1) {
    yield put(ImovelActions.registerInFailure());
    yield put(ToastActionsCreators.displayError(mensagem));
  } else if (tipo === 3) {
    yield put(ImovelActions.deletarImovelSucess());
    yield put(ToastActionsCreators.displayError(mensagem));
  } else {
    if (tipo === 4) {
      yield put(ImovelActions.registerInSuccessPesquisa(imovel));
      yield put(ToastActionsCreators.displayInfo(mensagem));
    } else {
      yield put(ImovelActions.registerInSuccess(imovel));
      yield put(ToastActionsCreators.displayInfo(mensagem));
    }
  }
}

function consistirDadosImovel(imovel) {
  if (imovel.descricaoImovel === '') {
    return 'Favor informar a Descrição do Imóvel.';
  }
  if (imovel.email === '') {
    return 'Favor informar o Email.';
  }
  if (imovel.logradouro === '') {
    return 'Favor informar o Logradouro do Imóvel.';
  }
  if (imovel.numero === '') {
    return 'Favor informar o Numero do Imóvel.';
  }
  if (imovel.bairro === '') {
    return 'Favor informar o Bairro do Imóvel.';
  }
  if (imovel.cidade === '') {
    return 'Favor informar o Cidade do Imóvel.';
  }
  if (imovel.cep === '') {
    return 'Favor informar o CEP do Imóvel.';
  }
  if (imovel.uf === '') {
    return 'Favor informar o UF do Imóvel.';
  }

  return '';
}

function* lerImoveis(action) {
  console.tron.log('lerImoveis: ', action);
  if (action.imovel === '') {
    const retorno = yield obterTodos()
      .then(resp => {
        var ret = {
          tipo: 1,
          mensagem: '',
          imoveis: resp,
        };

        return ret;
      })
      .catch(erro => {
        var ret = {
          tipo: 2,
          mensagem: erro,
          imoveis: [],
        };
        return ret;
      });
    return retorno;
  } else {
    const retorno = yield obterPesquisa(action)
      .then(resp => {
        var ret = {
          tipo: 1,
          mensagem: '',
          imoveis: resp,
        };

        return ret;
      })
      .catch(erro => {
        var ret = {
          tipo: 2,
          mensagem: erro,
          imoveis: [],
        };
        return ret;
      });
    return retorno;
  }
}

function obterTodos() {
  return new Promise((resolve, reject) => {
    get('/imovel/findAll', 'COM_TOKEN_USUARIO')
      .then(response => {
        var retorno = {
          tipo: '1',
          imovelList: response.data,
        };
        resolve(retorno);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}

function obterPesquisa(action) {
  return new Promise((resolve, reject) => {
    get(
      `/imovel/findPaginate?DescricaoImovel=${action.action.descricaoImovel}`,
      'COM_TOKEN_USUARIO',
    )
      .then(response => {
        var retorno = {
          tipo: '1',
          imovelList: response.data,
        };
        resolve(retorno);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}

export function* lerTodosImoveis(action) {
  try {
    const {isConnected} = yield NetInfo.fetch();
    if (isConnected) {
      ToastActionsCreators.displayInfo('Lendo os imóveis');
      var retorno = yield lerImoveis(action);
      yield apresentarMensagem(
        4,
        retorno.imoveis,
        'Leitura efetuada com sucesso',
      );
    } else {
      yield apresentarMensagem(1, null, 'Sem conexão com internet');
    }
  } catch (err) {
    yield apresentarMensagem(1, null, err.message);
    return;
  }
}
