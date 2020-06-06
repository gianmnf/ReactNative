import React from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Menu, {
  MenuItem,
  MenuDivider,
  Position,
} from 'react-native-enhanced-popup-menu';
import Icon from 'react-native-vector-icons/FontAwesome';

import Styles from './styles';

function PopMenu({navigation}) {
  let textRef = React.createRef();
  let menuRef = null;

  const setMenuRef = ref => (menuRef = ref);
  const hideMenu = () => menuRef.hide();
  const showMenu = () =>
    menuRef.show(textRef.current, (stickTo = Position.TOP_LEFT));

  const onPress = () => showMenu();

  function abrirAjuda() {
    navigation.navigate('Ajuda');
    hideMenu();
  }

  function abrirPesquisa() {
    navigation.navigate('Pesquisar');
    hideMenu();
  }

  function fechar() {
    navigation.navigate('Sair');
    hideMenu();
  }

  return (
    <View style={Styles.container}>
      <Text ref={textRef} style={Styles.headerText} />

      <TouchableOpacity onPress={onPress}>
        <Icon name="ellipsis-v" style={Styles.icone} />
      </TouchableOpacity>

      <Menu ref={setMenuRef}>
        <MenuItem onPress={abrirAjuda}>Ajuda</MenuItem>
        <MenuItem onPress={abrirPesquisa}>Pesquisar</MenuItem>
        {/* <MenuItem onPress={hideMenu} disabled>
          Item 3
        </MenuItem> */}
        <MenuDivider />
        <MenuItem onPress={fechar}>Fechar</MenuItem>
      </Menu>
    </View>
  );
}

export default PopMenu;
