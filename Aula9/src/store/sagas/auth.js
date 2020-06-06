import {call, put, select} from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';
//import AsyncStorage from '@react-native-community/async-storage';
import {ToastActionsCreators} from 'react-native-redux-toast';
import {ValidarEmail} from '../../utils/validarEmail';
import AsyncStorage from '@react-native-community/async-storage';

import {post, putAxios} from '../../services/api';

import {Verificar} from '../../utils/id';

// import {
//   obterPorIdeUsuario,
//   incluirUsuario,
//   obterPorEmail,
//   alterarUsuario,
// } from '../../services/usuarioService';

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

      var retornoPesquisar = yield pesquisarUsuario(action.user)
        .then(resp => {
          var retorno = {
            tipo: 2,
            mensagem: 'Autenticação efetuada com sucesso',
            usuario: resp.usuario,
            token: resp.token,
          };
          return retorno;
        })
        .catch(erro => {
          var retornoErro = {
            tipo: 1,
            mensagem: erro,
            usuario: action.user,
            token: '',
          };
          return retornoErro;
        });

      if (retornoPesquisar.tipo === 1) {
        yield apresentarMensagem(1, action.user, retornoPesquisar.mensagem);
      } else {
        yield AsyncStorage.setItem('@Aula:token', retornoPesquisar.token);

        yield apresentarMensagem(
          2,
          retornoPesquisar.usuario,
          'Autenticação efetuada com sucesso',
        );
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

function pesquisarUsuario(user) {
  const data = {
    IdeUsuario: user.ideUsuario,
    SenhaUsuario: user.senhaUsuario,
  };

  return new Promise((resolve, reject) => {
    post('/usuario/autenticar', 'SEM_TOKEN_JSON', data, 'S')
      .then(response => {
        console.tron.log('Pesquisa: ', response);
        var retorno = {
          tipo: '1',
          usuario: response.data.usuario,
          token: response.data.token,
        };

        resolve(retorno);
      })
      .catch(error => {
        reject(error.response.data.error);
      });
  });
}

/* Função para pesquisar o usuário a partir do IdeUsuario */

/* Função para incluir um usuário */

function* incluir(usuario) {
  const retorno = yield incluirUsuario(usuario)
    .then(resp => {
      console.log(resp);
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

function incluirUsuario(user) {
  const data = {
    IdeUsuario: user.ideUsuario,
    SenhaUsuario: user.senhaUsuario,
    NomeUsuario: user.nomeUsuario,
    EMail: user.email,
  };

  return new Promise((resolve, reject) => {
    post('/usuario', 'SEM_TOKEN_JSON', data, 'S')
      .then(response => {
        console.tron.log('Minha response: ', response);
        var retorno = {
          tipo: '1',
          usuario: response.data.usuario,
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

/* Função para alterar o usuário  */

function* alterar(usuario) {
  const retorno = yield alterarUsuario(usuario)
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

function alterarUsuario(user) {
  const data = {
    IdeUsuario: user.ideUsuario,
    SenhaUsuario: user.senhaUsuario,
    NomeUsuario: user.nomeUsuario,
    EMail: user.email,
  };

  console.tron.log('Testando o ID: ', user);

  return new Promise((resolve, reject) => {
    putAxios(`/usuario/${user._id}`, 'COM_TOKEN_USUARIO', data, 'S')
      .then(response => {
        console.tron.log(response);
        var retorno = {
          tipo: '1',
          usuario: response.data,
        };

        resolve(retorno);
      })
      .catch(error => {
        console.tron.log(error);
        reject(error.response.data.error);
      });
  });
}

/* Função para cadastrar um usuário */
export function* manterUsuario(action) {
  // Montando usuário
  console.tron.log('Este é meu tipo: ', action.tipo);
  try {
    const {isConnected} = yield NetInfo.fetch();
    if (isConnected) {
      var mensagemErro = yield consistirDadosUsuario(2, action.user);
      if (mensagemErro !== '') {
        yield apresentarMensagem(1, action.user, mensagemErro);
        return;
      }

      // Pesquisar se existe um usuário com esta identificação

      /* console.tron.log(yield pesquisarUsuario(action.user));

      // console.tron.log('pesquisa', retornoPesquisar);

      /* if (retornoPesquisar.tipo === 1) {
        yield apresentarMensagem(1, action.user, retornoPesquisar.mensagem);
      } else {
        yield apresentarMensagem(
          2,
          retornoPesquisar.usuario,
          'Autenticação efetuada com sucesso',
        );
      } */

      // Atualizar usuário
      if (action.tipo === 'C') {
        ToastActionsCreators.displayInfo('Incluindo Usuário');
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
      } else if (action.tipo === 'A') {
        ToastActionsCreators.displayInfo('Atualizando Usuário');
        var retorno = yield alterar(action.user);
        if (retorno.tipo === 1) {
          yield apresentarMensagem(
            2,
            retorno.usuario,
            'Alteração efetuada com sucesso',
          );
          return;
        } else {
          yield apresentarMensagem(1, action.user, retorno.mensagem);
          return;
        }
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
