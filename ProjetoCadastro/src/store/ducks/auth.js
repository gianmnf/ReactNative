import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* types & actions creators */
const {Types, Creators} = createActions({
  signInRequest: ['user'],
  signInSuccessAdmin: ['user'],
  signInSuccessConvidado: ['user'],
  signInFailure: ['user'],
  signInCancel: null,
  signInInicial: null,
});

export const AuthTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: false,
  login: false,
  idUsuario: '',
  senha: '',
  navegar: false,
  convidado: false,
});

/* Reducers */

export const signInInicialReducer = state => {
  return state.merge({
    loading: false,
    navegar: false,
  });
};

export const signInCancelReducer = state => {
  return state.merge({
    loading: false,
    login: false,
    navegar: true,
  });
};

export const signInRequestReducer = state => {
  return state.merge({
    loading: true,
    login: false,
    navegar: false,
  });
};

export const signInSuccessAdminReducer = (state, {user}) => {
  return state.merge({
    loading: false,
    login: true,
    navegar: true,
    idUsuario: user.idUsuario,
    senha: user.senha,
    convidado: false,
  });
};

export const signInSuccessConvidadoReducer = (state, {user}) => {
  return state.merge({
    loading: false,
    login: true,
    navegar: true,
    idUsuario: user.idUsuario,
    senha: user.senha,
    convidado: true,
  });
};

export const signInFailureReducer = (state, {user}) => {
  return state.merge({
    loading: false,
    idUsuario: user.idUsuario,
    senha: user.senha,
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_REQUEST]: signInRequestReducer,
  [Types.SIGN_IN_SUCCESS_ADMIN]: signInSuccessAdminReducer,
  [Types.SIGN_IN_SUCCESS_CONVIDADO]: signInSuccessConvidadoReducer,
  [Types.SIGN_IN_FAILURE]: signInFailureReducer,
  [Types.SIGN_IN_CANCEL]: signInCancelReducer,
  [Types.SIGN_IN_INICIAL]: signInInicialReducer,
});
