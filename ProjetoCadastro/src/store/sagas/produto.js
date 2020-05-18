import {call, put, select} from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';
import {ToastActionsCreators} from 'react-native-redux-toast';

import {
  incluirProduto,
  adicionarProdutoLista,
  obterPorNome,
  obterPorCodigo,
} from '../../services/produtoService';

import ProdutoActions from '../ducks/produto';

function* apresentarMensagem(tipo, produto, mensagem) {
  if (tipo === 1) {
    yield put(ToastActionsCreators.displayError(mensagem));
  } else {
    yield put(ProdutoActions.cadastrarProdutoSuccess(produto));
    yield put(ToastActionsCreators.displayInfo(mensagem));
  }
}

function* apresentarMensagemLista(tipo, produto, mensagem) {
  if (tipo === 1) {
    yield put(ToastActionsCreators.displayError(mensagem));
  } else {
    yield put(ProdutoActions.adicionarListaSuccess(produto));
    yield put(ToastActionsCreators.displayInfo(mensagem));
  }
}

function* incluir(produto) {
  const retorno = yield incluirProduto(produto)
    .then(resp => {
      var ret = {
        tipo: 1,
        mensagem: '',
        produto: resp,
      };

      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 2,
        mensagem: erro,
        produto: null,
      };
      return ret;
    });
  return retorno;
}

function* adicionar(produto) {
  const retorno = yield adicionarProdutoLista(produto)
    .then(resp => {
      var ret = {
        tipo: 1,
        mensagem: '',
        produto: resp,
      };

      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 2,
        mensagem: erro,
        produto: null,
      };
      return ret;
    });
  return retorno;
}

export function* adicionarLista(action) {
  try {
    const {isConnected} = yield NetInfo.fetch();
    if (isConnected) {
      ToastActionsCreators.displayInfo(
        'Adicionando o produto a lista de compras',
      );
      var retorno = yield adicionar(action.prod);
      if (retorno.tipo === 1) {
        yield apresentarMensagemLista(
          2,
          retorno.produto,
          'Produto adicionado a lista de compras com sucesso',
        );
        return;
      } else {
        yield apresentarMensagemLista(1, action.prod, retorno.mensagem);
        return;
      }
    } else {
      yield apresentarMensagemLista(1, action.prod, 'Sem conexão com internet');
    }
  } catch (err) {
    yield apresentarMensagemLista(1, action.prod, err.message);
    return;
  }
}

function* pesquisarProdutoPorCodigo(codigo) {
  const retorno = yield obterPorCodigo(codigo)
    .then(resp => {
      var ret = {
        tipo: 1,
        mensagem: '',
        produto: resp,
      };
      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 2,
        mensagem: erro,
        produto: null,
      };
      return ret;
    });
  return retorno;
}

function* pesquisarProdutoPorNome(nome) {
  const retorno = yield obterPorNome(nome)
    .then(resp => {
      var ret = {
        tipo: 1,
        mensagem: '',
        produto: resp,
      };
      return ret;
    })
    .catch(erro => {
      var ret = {
        tipo: 2,
        mensagem: erro,
        produto: null,
      };
      return ret;
    });
  return retorno;
}

export function* manterProduto(action) {
  try {
    const {isConnected} = yield NetInfo.fetch();
    if (isConnected) {
      var mensagemErro = yield consistirDadosProduto(2, action.produto);
      if (mensagemErro !== '') {
        yield apresentarMensagem(1, action.produto, mensagemErro);
        return;
      }

      var retorno = yield pesquisarProdutoPorCodigo(
        action.produto.codigoProduto,
      );

      if (
        retorno.tipo === 1 &&
        retorno.produto.codigoProduto === action.produto.codigoProduto
      ) {
        yield apresentarMensagem(
          1,
          action.produto,
          'Já existe um produto com este código.',
        );
        return;
      }

      var retorno = yield pesquisarProdutoPorNome(action.produto.nomeProduto);

      if (
        retorno.tipo === 1 &&
        retorno.produto.nomeProduto === action.produto.nomeProduto
      ) {
        yield apresentarMensagem(
          1,
          action.produto,
          'Já existe um produto com este nome.',
        );
        return;
      }

      if (action.produto.idProduto === 0) {
        ToastActionsCreators.displayInfo('Incluindo Produto');
        var retorno = yield incluir(action.produto);
        if (retorno.tipo === 1) {
          yield apresentarMensagem(
            2,
            retorno.produto,
            'Inclusão efetuada com sucesso',
          );
          return;
        } else {
          yield apresentarMensagem(1, action.produto, retorno.mensagem);
          return;
        }
      }
    } else {
      yield apresentarMensagem(1, action.produto, 'Sem conexão com internet');
    }
  } catch (err) {
    yield apresentarMensagem(1, action.produto, err.message);
    return;
  }
}

function consistirDadosProduto(origem, produto) {
  if (origem === 2) {
    if (produto.codigoProduto === '') {
      return 'Favor informar o código do produto.';
    }
    if (produto.nomeProduto === '') {
      return 'Favor informar o nome do produto.';
    }
    if (produto.valorProduto === '') {
      return 'Favor informar o valor do produto.';
    }
  }
  return '';
}
