import React, { useState, useEffect } from 'react'; 
import styles from './styles'; 


import {
    View,
    Text,
    ScrollView , TouchableOpacity
} from 'react-native';

import Styles from './styles';

function Detalhar({ navigation }) {

    //const { navigate, goBack, getParam } = useNavigation();
    
    const objeto = navigation.getParam("objeto");

    return ( 
        
        <View style={Styles.container}>
            <ScrollView>
            <Text>{objeto.nome}</Text>
            <TouchableOpacity
                style={Styles.button}
                onPress={() => navigation.goBack()}>
                <Text style={Styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
                
    );

}


export default Detalhar;