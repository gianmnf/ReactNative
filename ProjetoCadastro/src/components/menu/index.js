import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Image} from 'react-native';

import Icon from 'react-native-vector-icons/Fontisto';

import Logo from '../../assets/imagens/UniStore.png';

import Styles from './styles';

function Menu({navigation}) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [activeItemKey, setActiveItemKey] = useState('Main');

  navigateToScreen = route => {
    if (route === 'Hidden') {
      navigation.closeDrawer();
      return;
    }

    navigation.navigate(route);
    navigation.closeDrawer();

    if (route !== 'Login') {
      setActiveItemKey(route);

      var screen = {
        name: route,
      };

      dispatch({type: 'SET_NAVEGACAO', screen});
    }
  };

  if (auth.login === false) {
    navigation.navigate('login');
  }

  function navegarCadastro() {
    navigation.navigate('CadastroProduto');
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.headerContainer}>
        <Icon
          name="nav-icon"
          style={Styles.iconeHeader}
          onPress={() => navigateToScreen('Hidden')}
        />
        <Image source={Logo} style={Styles.headerImagem} />
      </View>

      <View style={Styles.line}>
        <View style={Styles.lineOneComplemento} />
      </View>
      <View style={Styles.screenContainer}>
        {auth.convidado !== true ? (
          <View
            style={[
              Styles.screenStyle,
              activeItemKey === 'CadastroProduto'
                ? Styles.activeBackgroundColor
                : null,
            ]}>
            <Icon name="plus-a" style={Styles.icone} />
            <Text
              style={[
                Styles.screenTextStyle,
                activeItemKey === 'CadastroProduto'
                  ? Styles.selectedTextStyle
                  : null,
              ]}
              onPress={() => navegarCadastro()}>
              Cadastro de Produto
            </Text>
          </View>
        ) : null}

        <View
          style={[
            Styles.screenStyle,
            activeItemKey == 'Main' ? Styles.activeBackgroundColor : null,
          ]}>
          <Icon name="home" style={Styles.icone} />
          <Text
            style={[
              Styles.screenTextStyle,
              activeItemKey == 'Main' ? Styles.selectedTextStyle : null,
            ]}
            onPress={() => navigateToScreen('Main')}>
            Home
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Menu;
