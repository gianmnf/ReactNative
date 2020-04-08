import React, { useState, useEffect } from 'react';
import HtmlText from "react-native-html-to-text";

import {
    View,
    ScrollView
} from 'react-native';

import Styles from "./styles";

function Ajuda() {

    const mensagem = "<p>Este aplicativo permite ........</p>" +
                     "<p>O aplicativo possui duas funções: </p>" + 
                     "<p><b>Primeira Função:</b> .......</p>" + 
                     "<p><b>Segunda Função:</b> .......</p>"; 
                     
    return (
        <View style={Styles.container}>

            <ScrollView>
               <HtmlText style={Styles.text} html={mensagem} />
            </ScrollView>

        </View>
    );

}


export default Ajuda;