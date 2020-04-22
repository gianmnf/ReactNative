import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, Image} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Logo from '../../assets/imagens/logo-unipam-com-selo.png';

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
    navigation.navigate('CadastroImovel', {
      tipoManutencaoParametro: 'Inclusao',
    });
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.headerContainer}>
        <Icon
          name="navicon"
          style={Styles.iconeHeader}
          onPress={() => navigateToScreen('Hidden')}
        />
        <Image source={Logo} style={Styles.headerImagem} />
      </View>

      <View style={Styles.line}>
        <View style={Styles.lineOneComplemento} />
      </View>
      <View style={Styles.screenContainer}>
        <View
          style={[
            Styles.screenStyle,
            activeItemKey == 'Ajuda' ? Styles.activeBackgroundColor : null,
          ]}>
          <Icon name="info-circle" style={Styles.icone} />
          <Text
            style={[
              Styles.screenTextStyle,
              activeItemKey == 'Ajuda' ? Styles.selectedTextStyle : null,
            ]}
            onPress={() => navigateToScreen('Ajuda')}>
            Ajuda
          </Text>
        </View>

        <View
          style={[
            Styles.screenStyle,
            activeItemKey === 'CadastroImovel'
              ? Styles.activeBackgroundColor
              : null,
          ]}>
          <Icon name="home" style={Styles.icone} />
          <Text
            style={[
              Styles.screenTextStyle,
              activeItemKey === 'CadastroImovel'
                ? Styles.selectedTextStyle
                : null,
            ]}
            onPress={() => navegarCadastro()}>
            Cadastro de Imóvel
          </Text>
        </View>

        <View
          style={[
            Styles.screenStyle,
            activeItemKey == 'Main' ? Styles.activeBackgroundColor : null,
          ]}>
          <Icon name="user-o" style={Styles.icone} />
          <Text
            style={[
              Styles.screenTextStyle,
              activeItemKey == 'Main' ? Styles.selectedTextStyle : null,
            ]}
            onPress={() => navigateToScreen('Main')}>
            Principal
          </Text>
        </View>

        <View style={Styles.line}>
          <View style={Styles.lineTwoComplemento} />
        </View>

        <View
          style={[
            Styles.screenStyle,
            activeItemKey == 'Sair' ? Styles.activeBackgroundColor : null,
          ]}>
          <Icon name="power-off" style={Styles.icone} />
          <Text
            style={[
              Styles.screenTextStyle,
              activeItemKey == 'Sair' ? Styles.selectedTextStyle : null,
            ]}
            onPress={() => navigateToScreen('Sair')}>
            Sair
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Menu;
