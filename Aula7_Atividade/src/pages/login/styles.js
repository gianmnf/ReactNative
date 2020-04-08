import {StyleSheet, Dimensions} from 'react-native';

import {colors, metrics} from '../../styles';

const DEVICE_WIDTH = Dimensions.get('window').width;

//
const styles = StyleSheet.create({
  headerImagem: {
    alignItems: 'center',
    marginLeft: metrics.screenWidth / 4,
  },

  container: {
    flex: 1,
    backgroundColor: colors.unipam,
    padding: metrics.basePadding * 2,
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  title: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Light',
  },

  text: {
    textAlign: 'center',
    marginTop: metrics.baseMargin,
    fontSize: 14,
    color: colors.light,
    lineHeight: 21,
    fontFamily: 'Poppins-Light',
  },

  error: {
    color: colors.erros,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: metrics.baseMargin,
    fontFamily: 'Poppins-Light',
  },

  form: {
    marginTop: metrics.baseMargin * 1,
  },

  input: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    width: DEVICE_WIDTH - 0.23 * DEVICE_WIDTH,
    height: 45,
    paddingLeft: 45,
    borderRadius: 10,
    color: '#000000',
    paddingHorizontal: metrics.basePadding,
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },

  containerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: metrics.basePadding,

    marginRight: metrics.baseMargin,
  },

  containerButtonCadastro: {
    paddingTop: metrics.basePadding * 3,
  },

  containerButtonGeral: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  button: {
    backgroundColor: colors.comandos,
    height: 44,
    width: 110,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonCancel: {
    backgroundColor: colors.orange,
    height: 44,
    width: 110,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonCadastrar: {
    backgroundColor: colors.fundo,
    height: 44,
    width: 320,
    borderRadius: 10,
    justifyContent: 'center',
  },

  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins-Light',
  },

  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 15,
    top: 9,
  },

  olho: {
    position: 'absolute',
    right: DEVICE_WIDTH - 0.92 * DEVICE_WIDTH,
    top: metrics.baseMargin,
    justifyContent: 'flex-end',
  },

  divOlho: {
    display: 'flex',
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
