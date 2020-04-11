import {call, put, select} from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';
//import AsyncStorage from '@react-native-community/async-storage';
import {ToastActionsCreators} from 'react-native-redux-toast';

import {
  obterPorDescricaoImovel,
  incluirImovel,
} from '../../services/imovelService';

import AuthActions from '../ducks/imovel';

function* apresentarMensagem(tipo, user, mensagem) {
  if (tipo === 1) {
    yield put(ToastActionsCreators.displayError(mensagem));
  } else {
    yield put(ToastActionsCreators.displayInfo(mensagem));
  }
}

function* pesquisarImovelPorDescricao(descricaoImovel) {
  const retorno = yield obterPorDescricaoImovel(descricaoImovel)
  return retorno;
}

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

export function* manterImovel(action) {
  try {
    const {isConnected} = yield NetInfo.fetch();
    if (isConnected) {
      var mensagemErro = yield consistirDadosImovel(2, action.imovel);
      if (mensagemErro !== '') {
        yield apresentarMensagem(1, action.imovel, mensagemErro);
        return;
      }

      // Pesquisar se existe um imóvel com esta identificação
      var retorno = yield pesquisarImovelPorDescricao(
        action.imovel.descricaoImovel,
      );

      if (
        retorno.tipo === 1 &&
        retorno.imovel.descricaoImovel !== action.imovel.descricaoImovel
      ) {
        yield apresentarMensagem(1, action.imovel, 'Imóvel já existente');
        return;
      }

      if (action.imovel.idImovel === 0) {
        ToastActionsCreators.displayInfo('Incluindo Imóvel');
        var retorno = yield incluir(action.imovel);
        if (retorno.tipo === 1) {
          yield apresentarMensagem(
            2,
            retorno.usuario,
            'Inclusão efetuada com sucesso',
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

function consistirDadosImovel(origem, user) {
  console.log(user);
  if (origem === 2) {
    if (user.descricaoImovel === '') {
      return 'Favor informar a descrição do Imovel.';
    }
    if (user.email === '') {
      return 'Favor informar o Email.';
    }
    if (user.logradouroImovel === '') {
      return 'Favor informar o logradouro do Imovel.';
    }
    if (user.numero === '') {
      return 'Favor informar o Número do Imovel.';
    }
    if (user.bairro === '') {
      return 'Favor informar o bairro em que se encontra o Imovel.';
    }
    if (user.cidade === '') {
      return 'Favor informar a cidade.';
    }
    if (user.cep === '') {
      return 'Favor informar o cep do Imovel.';
    }
    if (user.uf === '') {
      return 'Favor informar a UF.';
    }
    if (user.situacaoImovel === '') {
      return 'Favor informar a situacao do Imovel.';
    }
    /* if (ValidarEmail(user.email) === false) {
        return 'Favor informar o EMail do Usuário válido.';
      } */
  }
  if (user.idUsuario === '') {
    return 'Favor informar a Identificação do Usuário.';
  }
  return '';
}
