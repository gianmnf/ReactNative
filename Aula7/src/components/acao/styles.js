import { StyleSheet } from 'react-native';
import Metrics from '../../styles/metrics';
import Colors from '../../styles/colors';

const Styles = StyleSheet.create({ 
   
   containerAcao: {
      flexDirection: 'row',
      marginRight: Metrics.baseMargin,
      marginLeft: Metrics.baseMargin,
      marginTop: -15
   }, 
   icone: {
      fontSize: 30,
      color: Colors.white,
      marginRight: Metrics.baseMargin,
      marginTop: -3
   },
   popMenuConteiner: {
 
      marginTop: 0
   }

});

 

export default Styles;