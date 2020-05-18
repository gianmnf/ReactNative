import { StyleSheet } from 'react-native';
import Colors from '../../styles/colors';
import Metrics from '../../styles/metrics'; 

const Styles = StyleSheet.create({
    
    headerImagem: {
  
        alignItems: 'center',        
        marginLeft: Metrics.screenWidth / 4,
         
    },
    icone: {
        fontSize: 30,
        color: Colors.white,
        marginLeft : Metrics.baseMargin
    }
   
});

export default Styles;