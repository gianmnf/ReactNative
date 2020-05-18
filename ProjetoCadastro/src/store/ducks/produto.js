import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  cadastrarProdutoRequest: ['produto'],
  cadastrarProdutoSuccess: ['produto'],
  adicionarListaRequest: ['produto'],
  adicionarListaSuccess: ['produto'],
});

export const ProdutoTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: false,
  navegar: false,
  produto: null,
  modificado: false,
});

export const cadastrarProdutoRequestReducer = state =>
  state.merge({
    loading: true,
    login: false,
    navegar: false,
    produto: null,
  });

export const cadastrarProdutoSuccessReducer = (state, {produto}) => {
  return state.merge({
    loading: false,
    login: true,
    navegar: true,
    produto: produto,
  });
};

export const adicionarListaRequestReducer = state => {
  return state.merge({
    loading: false,
    login: false,
    navegar: false,
    produto: null,
  });
};

export const adicionarListaSuccessReducer = (state, {produto}) => {
  return state.merge({
    loading: false,
    login: true,
    navegar: true,
    produto: produto,
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CADASTRAR_PRODUTO_REQUEST]: cadastrarProdutoRequestReducer,
  [Types.CADASTRAR_PRODUTO_SUCCESS]: cadastrarProdutoSuccessReducer,
  [Types.ADICIONAR_LISTA_REQUEST]: adicionarListaRequestReducer,
  [Types.ADICIONAR_LISTA_SUCCESS]: adicionarListaSuccessReducer,
});
