import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  cadastrarImovelRequest: ['house'],
  cadastrarImovelSuccess: ['house'],
  deletarImovelRequest: ['idImovel'],
  deletarImovelSuccess: null,
});

export const ImovelTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  loading: false,
  navegar: false,
  imovel: null,
  modificado: false,
});

export const cadastrarImovelRequestReducer = state =>
  state.merge({
    loading: true,
    login: false,
    navegar: false,
    imovel: null,
  });

export const cadastrarImovelSuccessReducer = (state, {house}) => {
  return state.merge({
    loading: false,
    login: true,
    navegar: true,
    imovel: house,
  });
};

export const deletarImovelRequestReducer = state => {
  return state.merge({
    loading: false,
    login: true,
    navegar: false,
    imovel: null,
    modificado: false,
  });
};

export const deletarImovelSuccessReducer = state => {
  return state.merge({
    loading: false,
    login: true,
    navegar: true,
    imovel: null,
    modificado: true,
  });
};


export const reducer = createReducer(INITIAL_STATE, {
  [Types.CADASTRAR_IMOVEL_REQUEST]: cadastrarImovelRequestReducer,
  [Types.CADASTRAR_IMOVEL_SUCCESS]: cadastrarImovelSuccessReducer,
  [Types.DELETAR_IMOVEL_REQUEST]: deletarImovelRequestReducer,
  [Types.DELETAR_IMOVEL_SUCCESS]: deletarImovelSuccessReducer,
});
