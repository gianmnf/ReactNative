import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
    setNavegacao: ['screen'],
    setRotacionar: ['rotacionar'],
    setParametro: ['dados']
});

export const NavegacaoTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
    screen: 'Main',
    rotacionar: false,
    parametro: null,
    screenOrigem: '',
    screenDestino: ''
});

export const setParametroReducer = (state, { dados }) => {


    return state.merge({
        parametro: dados.parametro,
        screenOrigem: dados.screenOrigem,
        screenDestino: dados.screenDestino
    });
};

export const setNavegacaoReducer = (state, { screen }) => {

    return state.merge({
        screen: screen
    });
};

export const setRotacionarReducer = (state, { rotacionar }) => {

    return state.merge({
        rotacionar: rotacionar
    });
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_NAVEGACAO]: setNavegacaoReducer,
    [Types.SET_ROTACIONAR]: setRotacionarReducer,
    [Types.SET_PARAMETRO]: setParametroReducer

});
