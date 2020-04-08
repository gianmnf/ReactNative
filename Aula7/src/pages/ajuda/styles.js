import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../styles/colors';
import Metrics from '../../styles/metrics';

const Styles = StyleSheet.create({


   container: {
      backgroundColor: Colors.light,
      flex: 1,
      flexDirection: 'column',
   },
   
   text: {
      textAlign: "justify",
      marginTop: Metrics.baseMargin,
      marginLeft: Metrics.baseMargin,
      marginRight: Metrics.baseMargin,
      fontSize: Metrics.fontSizeDown,
      fontFamily: 'Poppins-Light'
  },
});

/*"space-around"*/
export default Styles;
