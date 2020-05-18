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
    backgroundColor: colors.white,
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

  formCEP: {
    marginTop: metrics.baseMargin * 1,
    marginBottom: metrics.baseMargin * 5,
    flex: 1,
    flexDirection: 'row',
    //justifyContent: "center",
    //alignItems: "stretch"
  },

  input: {
    backgroundColor: colors.fundo2,
    borderColor: colors.fundo2,
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

  button: {
    backgroundColor: colors.comandos,
    height: 44,
    width: 110,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
});
export default styles;
