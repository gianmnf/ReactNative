import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* types & actions creators */
const {Types, Creators} = createActions({
  signInRequest: ['user'],
  signInSuccess: ['user'],
  signInFailure: ['user'],
  signInCancel: null,
  signInInicial: null,
  cadastrarUsuarioRequest: ['user'],
});

export const AuthTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: false,
  login: false,
  ideUsuario: '',
  senhaUsuario: '',
  navegar: false,
  usuario: null,
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

export const signInRequestReducer = state =>
  state.merge({
    loading: true,
    login: false,
    navegar: false,
  });

export const signInSuccessReducer = (state, {user}) => {
  return state.merge({
    loading: false,
    login: true,
    navegar: true,
    ideUsuario: user.ideUsuario,
    senhaUsuario: user.senhaUsuario,
    usuario: user,
  });
};

export const signInFailureReducer = (state, {user}) => {
  return state.merge({
    loading: false,
    ideUsuario: user.ideUsuario,
    senhaUsuario: user.senhaUsuario,
  });
};

export const cadastrarUsuarioRequestReducer = state =>
  state.merge({
    loading: true,
    login: false,
    navegar: false,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_REQUEST]: signInRequestReducer,
  [Types.SIGN_IN_SUCCESS]: signInSuccessReducer,
  [Types.SIGN_IN_FAILURE]: signInFailureReducer,
  [Types.SIGN_IN_CANCEL]: signInCancelReducer,
  [Types.SIGN_IN_INICIAL]: signInInicialReducer,
  [Types.CADASTRAR_USUARIO_REQUEST]: cadastrarUsuarioRequestReducer,
});
