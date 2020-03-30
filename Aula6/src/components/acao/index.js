import React from 'react'; 

import {
    View 
} from 'react-native';

import PopMenu from "../../components/popMenu";

import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './styles'; 

function Acao({ navigation }) {
   
    function acao1 ()  {
        var objeto = {
           id : 1,
           nome : 'teste'
        }
        navigation.navigate("Detalhar", { objeto });
    } 
    return (
        <View style={Styles.containerAcao}>
             
            <Icon name="help" style={Styles.icone} 
                onPress={() => acao1()} />                               
                     
            <PopMenu style={Styles.popMenuConteiner} navigation={navigation} />
       </View>
    );

}


export default Acao;