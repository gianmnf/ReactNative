import {StyleSheet} from 'react-native';
import {colors, metrics} from '../../styles/';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    margin: metrics.basePadding,
  },

  texto: {
    fontSize: 15,
    color: colors.black,
    padding: 5
  },
  icone: {
    fontSize: 30,
    color: colors.fundo,
  },
  button: {
    backgroundColor: colors.comandos,
    height: 44,
    width: 140,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  buttonDelete: {
    backgroundColor: colors.danger,
    height: 44,
    width: 140,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonEdit: {
    backgroundColor: colors.amareloMenu,
    height: 44,
    width: 140,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: metrics.basePadding,
    paddingBottom: metrics.basePadding,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    height: 190,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    margin: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

});

/*"space-around"*/
export default Styles;
