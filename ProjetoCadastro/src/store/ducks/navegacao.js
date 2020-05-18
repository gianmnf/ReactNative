import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  setNavegacaoIniciar: ['screen'],
  setNavegacaoFinalizar: null,
});

export const NavegacaoTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  screen: 'Main',
  loading: false,
});

export const setNavegacaoIniciarReducer = (state, {screen}) => {
  return state.merge({
    screen: screen,
    loading: true,
  });
};

export const setNavegacaoFinalizarReducer = (state, {screen}) => {
  return state.merge({
    loading: false,
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_NAVEGACAO_INICIAR]: setNavegacaoIniciarReducer,
  [Types.SET_NAVEGACAO_FINALIZAR]: setNavegacaoFinalizarReducer,
});
