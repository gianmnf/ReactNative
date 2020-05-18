import React from 'react';

import {View, TouchableOpacity, ScrollView, Image, Text} from 'react-native';
import Styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function NavigationDrawerStructure({navigationProps}) {
  function toggleDrawer() {
    navigationProps.toggleDrawer();
  }

  return (
    <ScrollView>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => toggleDrawer()}>
          <Icon name="navicon" style={Styles.icone} />
        </TouchableOpacity>
        <Image
          source={require('../../assets/imagens/UniStore.png')}
          style={Styles.headerImagem}
        />
      </View>
    </ScrollView>
  );
}
