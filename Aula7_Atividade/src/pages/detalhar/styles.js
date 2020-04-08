import { StyleSheet } from 'react-native';
import Colors from '../../styles/colors';
import Metrics from '../../styles/metrics';

const Styles = StyleSheet.create({
   

   container: {
      height: Metrics.screenHeight,
      backgroundColor: Colors.fundo2,
      flexDirection: 'column',
      flex: 1
   },

   button: {
      backgroundColor: Colors.comandos,
      height: 44,
      width: 110,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },

    buttonText: {
      color: Colors.white,
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: 'Poppins-Light',
    },

});

/*"space-around"*/

export default Styles;