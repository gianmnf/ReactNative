import {call, put, select} from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';
//import AsyncStorage from '@react-native-community/async-storage';
import {ToastActionsCreators} from 'react-native-redux-toast';
import {ValidarEmail} from '../../utils/validarEmail';

import {
  obterPorIdeUsuario,
  incluirUsuario,
  obterPorEmail,
} from '../../services/usuarioService';

import AuthActions from '../ducks/auth';

export function* login(action) {
  try {
    const {isConnected} = yield NetInfo.fetch();
    if (isConnected) {
      var mensagemErro = yield consistirDadosUsuario(1, action.user);

      if (mensagemErro !== '') {
        yield apresentarMensagem(1, action.user, mensagemErro);
        return;
      }

      ToastActionsCreators.displayInfo('Autenticando');

      var retorno = yield pesquisarUsuarioPorIdentificacaoDoUsuario(
        action.user.ideUsuario,
      );

      if (retorno.tipo === 1) {
        if (retorno.usuario.senhaUsuario !== action.user.senhaUsuario) {
          yield apresentarMensagem(1, action.user, 'Senha inválida');
          return;
        } else {
          yield apresentarMensagem(
            2,
            retorno.usuario,
            'Autenticação efetuada com sucesso',
          );
          return;
        }
      } else {
        yield apresentarMensagem(1, action.user, retorno.mensagem);
        return;
      }
    } else {
      yield apresentarMensagem(1, action.user, 'Sem conexão com internet');
      return;
    }
  } catch (err) {
    yield apresentarMensagem(1, action.user, err.message);
    return;
  }
}

/* função para apresentar o erro */

function* apresentarMensagem(tipo, user, mensagem) {
  if (tipo === 1) {
    yield put(AuthActions.signInFailure(user));
    yield put(ToastActionsCreators.displayError(mensagem));
  } else {
    yield put(AuthActions.signInSuccess(user));
    yield put(ToastActionsCreators.displayInfo(mensagem));
  }
}

/* Função para pesquisar o usuário a partir do IdeUsuario */

function* pesquisarUsuarioPorIdentificacaoDoUsuario(ideUsuario) {
  const retorno = yield obterPorIdeUsuario(ideUsuario)
    .then(resp => {
      var ret = {
        tipo: 1,
        mensagem: '',
        usuario: resp,
      };
      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 2,
        mensagem: erro,
        usuario: null,
      };
      return ret;
    });
  return retorno;
}

/* Função para pesquisar o usuário a partir do IdeUsuario */

function* pesquisarUsuarioPorEmail(email) {
  const retorno = yield obterPorEmail(email)
    .then(resp => {
      var ret = {
        tipo: 1,
        mensagem: '',
        usuario: resp,
      };
      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 2,
        mensagem: erro,
        usuario: null,
      };
      return ret;
    });
  return retorno;
}

/* Função para pesquisar o usuário a partir do IdeUsuario */

function* incluir(usuario) {
  const retorno = yield incluirUsuario(usuario)
    .then(resp => {
      var ret = {
        tipo: 1,
        mensagem: '',
        usuario: resp,
      };

      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 2,
        mensagem: erro,
        usuario: null,
      };
      return ret;
    });
  return retorno;
}

/* Função para cadastrar um usuário */
export function* cadastrarUsuario(action) {
  try {
    const {isConnected} = yield NetInfo.fetch();
    if (isConnected) {
      var mensagemErro = yield consistirDadosUsuario(2, action.user);
      if (mensagemErro !== '') {
        yield apresentarMensagem(1, action.user, mensagemErro);
        return;
      }

      // Pesquisar se existe um usuário com esta identificação
      var retorno = yield pesquisarUsuarioPorIdentificacaoDoUsuario(
        action.user.ideUsuario,
      );

      if (retorno.tipo === 1) {
        yield apresentarMensagem(
          1,
          action.user,
          'Identificação do Usuário já existente',
        );
        return;
      }
      // Pesquisar se existe um usuário com este email
      var retorno = yield pesquisarUsuarioPorEmail(action.user.email);

      if (retorno.tipo === 1) {
        yield apresentarMensagem(
          1,
          action.user,
          'Email do Usuário já existente',
        );
        return;
      }

      ToastActionsCreators.displayInfo('Incluindo Usuário');

      // Incluir usuário
      var retorno = yield incluir(action.user);

      if (retorno.tipo === 1) {
        yield apresentarMensagem(
          2,
          retorno.usuario,
          'Inclusão efetuada com sucesso',
        );
        return;
      } else {
        yield apresentarMensagem(1, action.user, retorno.mensagem);
        return;
      }
    } else {
      yield apresentarMensagem(1, action.user, 'Sem conexão com internet');
    }
  } catch (err) {
    yield apresentarMensagem(1, action.user, err.message);
    return;
  }
}

function consistirDadosUsuario(origem, user) {
  if (origem === 2) {
    if (user.nomeUsuario === '') {
      return 'Favor informar o Nome do Usuário.';
    }
    if (user.email === '') {
      return 'Favor informar o EMail do Usuário.';
    }
    if (ValidarEmail(user.email) === false) {
      return 'Favor informar o EMail do Usuário válido.';
    }
  }
  if (user.ideUsuario === '') {
    return 'Favor informar a Identificação do Usuário.';
  }

  if (user.senhaUsuario === '') {
    return 'Favor informar a senha do Usuário.';
  }
  return '';
}
