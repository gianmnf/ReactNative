import {all, takeLatest, take} from 'redux-saga/effects';

// Importar os métodos
import {login} from './auth';
import {manterProduto, adicionarLista} from './produto';
import {apresentarMensagem} from './mensagem';

// Importar os types
import {AuthTypes} from '../ducks/auth';
import {ProdutoTypes} from '../ducks/produto';
import {MensagemTypes} from '../ducks/mensagem';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, login),
    takeLatest(ProdutoTypes.CADASTRAR_PRODUTO_REQUEST, manterProduto),
    takeLatest(ProdutoTypes.ADICIONAR_LISTA_REQUEST, adicionarLista),
    takeLatest(MensagemTypes.SET_MENSAGEM, apresentarMensagem),
  ]);
}
