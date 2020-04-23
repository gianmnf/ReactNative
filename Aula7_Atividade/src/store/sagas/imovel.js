import {call, put, select} from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';
import {ToastActionsCreators} from 'react-native-redux-toast';
import {ValidarEmail} from '../../utils/validarEmail';

import {
  incluirImovel,
  alterarImovel,
  obterPorDescricao,
  deletarImovel,
} from '../../services/imovelService';

import ImovelActions from '../ducks/imovel';

function* apresentarMensagem(tipo, house, mensagem) {
  if (tipo === 1) {
    yield put(ToastActionsCreators.displayError(mensagem));
  } else {
    yield put(ImovelActions.cadastrarImovelSuccess(house));
    yield put(ToastActionsCreators.displayInfo(mensagem));
  }
}

function* apresentarMensagemDelete(tipo, mensagem) {
  if (tipo === 1) {
    yield put(ToastActionsCreators.displayError(mensagem));
  } else {
    yield put(ImovelActions.deletarImovelSuccess());
    yield put(ToastActionsCreators.displayInfo(mensagem));
  }
}

/* Função para pesquisar o imóvel a partir da descrição */

function* pesquisarImovelPorDescricao(descricao) {
  const retorno = yield obterPorDescricao(descricao)
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

/* Função para incluir um imóvel */

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

/* Função para alterar um imóvel  */

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

export function* excluirImovel(action) {
  try {
    var retorno = yield exclusaoImovel(action.idRemover);

    if (retorno.tipo === 1) {
      yield apresentarMensagemDelete(2, 'Imóvel removido com sucesso!');
      return;
    } else {
      yield apresentarMensagemDelete(1, 'Não foi possível remover o imóvel');
      return;
    }
  } catch (err) {
    yield apresentarMensagemDelete(1, err.message);
    return;
  }
}

function* exclusaoImovel(idImovel) {
  const retorno = yield deletarImovel(idImovel)
    .then(res => {
      var ret = {
        tipo: 1,
        mensagem: '',
      };
      return ret;
    })
    .catch(err => {
      var ret = {
        tipo: 1,
        mensagem: err,
      };
      return ret;
    });
  return retorno;
}

/* Função para cadastrar um imóvel */
export function* manterImovel(action) {
  console.log('Manter Imóvel: ' + JSON.stringify(action));
  try {
    const {isConnected} = yield NetInfo.fetch();
    if (isConnected) {
      var mensagemErro = yield consistirDadosImovel(2, action.house);
      if (mensagemErro !== '') {
        yield apresentarMensagem(1, action.house, mensagemErro);
        return;
      }

      // Pesquisar se existe um imóvel com esta descrição
      var retorno = yield pesquisarImovelPorDescricao(
        action.house.descricaoImovel,
      );

      if (
        retorno.tipo === 1 &&
        retorno.house.idImovel !== action.house.idImovel
      ) {
        yield apresentarMensagem(1, action.house, 'Imóvel já existente');
        return;
      }

      if (action.house.idImovel === 0) {
        ToastActionsCreators.displayInfo('Incluindo Imóvel');
        var retorno = yield incluir(action.house);
        if (retorno.tipo === 1) {
          yield apresentarMensagem(
            2,
            retorno.imovel,
            'Inclusão efetuada com sucesso',
          );
          return;
        } else {
          yield apresentarMensagem(1, action.house, retorno.mensagem);
          return;
        }
      } else {
        ToastActionsCreators.displayInfo('Atualizando Imóvel');
        var retorno = yield alterar(action.house);
        if (retorno.tipo === 1) {
          yield apresentarMensagem(
            2,
            retorno.imovel,
            'Alteração efetuada com sucesso',
          );
          return;
        } else {
          yield apresentarMensagem(1, action.house, retorno.mensagem);
          return;
        }
      }
    } else {
      yield apresentarMensagem(1, action.house, 'Sem conexão com internet');
    }
  } catch (err) {
    yield apresentarMensagem(1, action.house, err.message);
    return;
  }
}

function consistirDadosImovel(origem, house) {
  if (origem === 2) {
    if (house.descricaoImovel === '') {
      return 'Favor informar a descrição do Imóvel.';
    }
    if (house.email === '') {
      return 'Favor informar o Email.';
    }
    if (ValidarEmail(house.email) === false) {
      return 'Favor informar um Email válido.';
    }
    if (house.logradouroImovel === '') {
      return 'Favor informar o Logradouro do Imóvel.';
    }
    if (house.numero === '') {
      return 'Favor informar o Número do Imóvel.';
    }
    if (house.bairro === '') {
      return 'Favor informar o Bairro.';
    }
    if (house.cidade === '') {
      return 'Favor informar a Cidade.';
    }
    if (house.cep === '') {
      return 'Favor informar o CEP.';
    }
    if (house.uf === '') {
      return 'Favor informar a UF.';
    }
    if (house.situacaoImovel === '') {
      return 'Favor informar a situação do Imóvel.';
    }
  }
  if (house.idUsuario === '') {
    return 'Favor informar o ID do Usuário.';
  }
  return '';
}
