import { call, put, select } from 'redux-saga/effects';
import NetInfo from '@react-native-community/netinfo';
//import AsyncStorage from '@react-native-community/async-storage';
import { ToastActionsCreators } from 'react-native-redux-toast';

import AuthActions from '../ducks/auth'; 

export function* login(action) {
    try {
        const { isConnected } = yield NetInfo.fetch();
        if (isConnected) {

            if (action.user.ideUsuario === '') {
                yield put(AuthActions.signInFailure(action.user));
                yield put(
                    ToastActionsCreators.displayError('Favor informar o usuário.'),
                );
                return;
            }

            if (action.user.senha === '') {
                yield put(AuthActions.signInFailure(action.user));
                yield put(ToastActionsCreators.displayError('Favor informar a senha.'));
                return;
            }

            ToastActionsCreators.displayInfo('Autenticando');

            for (var i = 0; i < 4000000; i++) {

            }
   
            yield put(AuthActions.signInSuccess(action.user));

            yield put(
                ToastActionsCreators.displayInfo('Autenticação efetuada com sucesso.'),
            );
        } else {
            yield put(AuthActions.signInFailure(action.user));
            yield put(
                ToastActionsCreators.displayError(
                    'Sem conexão de internet. Favor conectar',
                ),
            );
        }
    } catch (err) {
        yield put(AuthActions.signInFailure(action.user));
        yield put(ToastActionsCreators.displayError(err.message));
    }
}
