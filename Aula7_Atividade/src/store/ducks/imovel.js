import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* types & actions creators */
const {Types, Creators} = createActions({
  cadastrarImovelRequest: ['imovel'],
});

export const ImovelTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  navegar: false,
  imovel: null,
});

export const cadastrarImovelRequestReducer = state =>
  state.merge({
    navegar: false,
    imovel: null,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CADASTRAR_IMOVEL_REQUEST]: cadastrarImovelRequestReducer,
});
