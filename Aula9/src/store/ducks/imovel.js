import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* types & actions creators */
const {Types, Creators} = createActions({
  cadastrarImovelRequest: ['imovel'],
  registerInFailure: ['imovel'],
  registerInSuccess: ['imovel'],
  registerInSuccessPesquisa: ['imovel'],
  pesquisarImovelRequest: ['action'],
  deletarImovelRequest: null,
  deletarImovelSucess: null,
  alterarImovelRequest: null,
  inicializarImovelRequest: null,
  obterImovel: null,
});

export const ImovelTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  imovel: null,
  loading: false,
  atualizado: 'N',
  imoveis: [],
});

export const pesquisarImovelRequestReducer = state =>
  state.merge({
    imoveis: [],
    loading: false,
    atualizado: 'N',
  });

export const inicializarImovelRequestReducer = state =>
  state.merge({
    imovel: null,
    loading: false,
    atualizado: 'N',
  });

export const cadastrarImovelRequestReducer = state =>
  state.merge({
    imovel: null,
    loading: true,
    atualizado: 'N',
  });

export const deletarImovelRequestReducer = state =>
  state.merge({
    imovel: null,
    loading: true,
    atualizado: 'N',
  });

export const alterarImovelRequestReducer = state =>
  state.merge({
    loading: true,
    atualizado: 'N',
  });

export const registerInFailureReducer = state => {
  console.tron.log('Dentro do registrer');
  return state.merge({
    loading: false,
    atualizado: 'N',
  });
};

export const registerInSuccessReducer = state =>
  state.merge({
    loading: false,
    atualizado: 'S',
  });

export const registerInSuccessPesquisaReducer = (state, {imovel}) => {
  console.tron.log('Dentro do ducs');
  console.tron.log(imovel);
  return state.merge({
    loading: false,
    atualizado: 'L',
    imoveis: imovel,
  });
};

export const deletarImovelSucessReducer = state =>
  state.merge({
    loading: false,
    atualizado: 'S',
  });

export const obterImovelReducer = (state, {imovel}) => {
  return state.merge({
    imovel: imovel,
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CADASTRAR_IMOVEL_REQUEST]: cadastrarImovelRequestReducer,
  [Types.REGISTER_IN_FAILURE]: registerInFailureReducer,
  [Types.REGISTER_IN_SUCCESS]: registerInSuccessReducer,
  [Types.DELETAR_IMOVEL_REQUEST]: deletarImovelRequestReducer,
  [Types.DELETAR_IMOVEL_SUCESS]: deletarImovelSucessReducer,
  [Types.ALTERAR_IMOVEL_REQUEST]: alterarImovelRequestReducer,
  [Types.OBTER_IMOVEL]: obterImovelReducer,
  [Types.INICIALIZAR_IMOVEL_REQUEST]: inicializarImovelRequestReducer,
  [Types.REGISTER_IN_SUCCESS_PESQUISA]: registerInSuccessPesquisaReducer,
  [Types.PESQUISAR_IMOVEL_REQUEST]: pesquisarImovelRequestReducer,
});
