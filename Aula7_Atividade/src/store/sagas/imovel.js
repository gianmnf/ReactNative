import {call, put, select} from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';
import {ToastActionsCreators} from 'react-native-redux-toast';
import {ValidarEmail} from '../../utils/validarEmail';

import {incluirImovel} from '../../services/imovelService';

import ImovelActions from '../ducks/imovel';

function* apresentarMensagem(tipo, user, mensagem) {
  if (tipo === 1) {
    yield put(ToastActionsCreators.displayError(mensagem));
  } else {
    yield put(ImovelActions.cadastrarImovelRequestSuccess(user));
    yield put(ToastActionsCreators.displayInfo(mensagem));
  }
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

/* Função para cadastrar um imóvel */
export function* manterImovel(action) {
  console.tron.log(action.house);
  try {
    const {isConnected} = yield NetInfo.fetch();
    if (isConnected) {
      var mensagemErro = yield consistirDadosImovel(2, action.house);
      if (mensagemErro !== '') {
        yield apresentarMensagem(1, action.house, mensagemErro);
        return;
      }
      if (action.house.idImovel === 0) {
        console.tron.log('Chegou Aqui');
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
          yield apresentarMensagem(1, action.user, retorno.mensagem);
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
