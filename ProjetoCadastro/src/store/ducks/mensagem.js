import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  setMensagem: ['mensagem'],
});

export const MensagemTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  mensagem: null,
});

export const setMensagemReducer = (state, {mensagem}) => {
  return state.merge({
    mensagem: mensagem,
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_MENSAGEM]: setMensagemReducer,
});
