import {put} from 'redux-saga/effects';
import {ToastActionsCreators} from 'react-native-redux-toast';

export function* apresentarMensagem({mensagem}) {
  console.tron.log('Mensagem');
  console.tron.log(mensagem);
  // yield put(ToastActionsCreators.displayError(mensagem.texto));
  switch (mensagem.tipo) {
    case 1: {
      yield put(ToastActionsCreators.displayError(mensagem.texto));
      break;
    }
    case 2: {
      yield put(ToastActionsCreators.displayInfo(mensagem.texto));
      break;
    }
    case 3: {
      yield put(ToastActionsCreators.displayWarning(mensagem.texto));
      break;
    }
  }
}
