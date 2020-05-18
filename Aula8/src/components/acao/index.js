import React from 'react';
import {useSelector} from 'react-redux';

import {View, ActivityIndicator} from 'react-native';

import PopMenu from '../../components/popMenu';

import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './styles';

function Acao({navigation}) {
  const navegacao = useSelector(state => state.navegacao);

  function pesquisar() {
    navigation.navigate('Pesquisar');
  }
  return (
    <View style={Styles.containerAcao}>
      {navegacao.loading && <ActivityIndicator size="large" color="white" />}
      {!navegacao.loading && (
        <Icon name="search" style={Styles.icone} onPress={() => pesquisar()} />
      )}

      <PopMenu style={Styles.popMenuConteiner} navigation={navigation} />
    </View>
  );
}

export default Acao;
