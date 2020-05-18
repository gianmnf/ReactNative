import {StyleSheet} from 'react-native';
import Colors from '../../styles/colors';

const Styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },

  texto: {
    fontSize: 15,
    color: Colors.black,
    fontWeight: 'bold',
  },
  icone: {
    fontSize: 30,
    color: Colors.fundo,
  },
  containerPhone: {
    flexDirection: 'column',
    flex: 1,
  },
  btn: {
    color: Colors.vermelho,
  },
});

/*"space-around"*/
export default Styles;
