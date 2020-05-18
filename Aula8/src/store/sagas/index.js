import {all, takeLatest, take} from 'redux-saga/effects';

// Importar os métodos
import {login, manterUsuario} from './auth';
import {apresentarMensagem} from './mensagem';
import {manterImovel, deletarImovel, lerTodosImoveis} from './imovel';

// Importar os types
import {AuthTypes} from '../ducks/auth';
import {MensagemTypes} from '../ducks/mensagem';
import {ImovelTypes} from '../ducks/imovel';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, login),
    takeLatest(AuthTypes.CADASTRAR_USUARIO_REQUEST, manterUsuario),
    takeLatest(MensagemTypes.SET_MENSAGEM, apresentarMensagem),
    takeLatest(ImovelTypes.CADASTRAR_IMOVEL_REQUEST, manterImovel),
    takeLatest(ImovelTypes.DELETAR_IMOVEL_REQUEST, deletarImovel),
    takeLatest(ImovelTypes.PESQUISAR_IMOVEL_REQUEST, lerTodosImoveis),
  ]);
}
