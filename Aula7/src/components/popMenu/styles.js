import { StyleSheet } from 'react-native';
import Colors from '../../styles/colors';
import Metrics from '../../styles/metrics';

const Styles = StyleSheet.create({
    container: {
   
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.transparent,
        marginRight: 5,
        marginTop:-20 
          
    },

    headerText: {
        backgroundColor : Colors.transparent
    },
    
    icone: {
        fontSize: 30,
        color: '#fff',
    },
});

export default Styles;