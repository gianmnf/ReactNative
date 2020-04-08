import {combineReducers} from 'redux';
import {toastReducer as toast} from 'react-native-redux-toast';

import {reducer as auth} from './auth';
import {reducer as navegacao} from './navegacao';
import {reducer as mensagem} from './mensagem';

export default combineReducers({
  auth,
  toast,
  navegacao,
  mensagem,
});
