import React, {useState, useEffect} from 'react';
import HtmlText from 'react-native-html-to-text';

import {View, ScrollView} from 'react-native';

import Styles from './styles';

function Configuracoes() {
  const mensagem =
    '<h5>Configurações</h5>' +
    '<p>Digite o Email:</p>' +
    '<p>Digite uma nova Senha:</p>' +
    '<p>Digite a Senha novamente:</p>'+
    '<p color=green>Sucesso!</p>';

  return (
    <View style={Styles.container}>
      <ScrollView>
        <HtmlText style={Styles.text} html={mensagem} />
      </ScrollView>
    </View>
  );
}

export default Configuracoes;
