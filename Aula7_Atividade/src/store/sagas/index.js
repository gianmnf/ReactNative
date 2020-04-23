import {all, takeLatest, take} from 'redux-saga/effects';

// Importar os métodos
import {login, manterUsuario} from './auth';
import {manterImovel, excluirImovel} from './imovel';
import {apresentarMensagem} from './mensagem';

// Importar os types
import {AuthTypes} from '../ducks/auth';
import {ImovelTypes} from '../ducks/imovel';
import {MensagemTypes} from '../ducks/mensagem';

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGN_IN_REQUEST, login),
    takeLatest(AuthTypes.CADASTRAR_USUARIO_REQUEST, manterUsuario),
    takeLatest(ImovelTypes.CADASTRAR_IMOVEL_REQUEST, manterImovel),
    takeLatest(ImovelTypes.DELETAR_IMOVEL_REQUEST, excluirImovel),
    takeLatest(MensagemTypes.SET_MENSAGEM, apresentarMensagem),
  ]);
}
