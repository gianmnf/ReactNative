import React, {useState, useEffect} from 'react';
import styles from './styles';
import {useSelector, useDispatch} from 'react-redux';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Styles from './styles';
function Pesquisar({navigation}) {
  const auth = useSelector(state => state.auth);
  const [descricaoImovel, setDescricaoImovel] = useState('');
  const dispatch = useDispatch();

  function listarImoveis() {
    var action = {
      descricaoImovel: descricaoImovel,
    };

    dispatch({type: 'PESQUISAR_IMOVEL_REQUEST', action});
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Icon name="home" size={18} style={styles.inlineImg} />
        <TextInput
          style={styles.input}
          placeholder="Digite a Descrição do Imóvel"
          autoCapitalize="none"
          autoCorrect={false}
          value={descricaoImovel}
          onChangeText={text => setDescricaoImovel(text)}
          autoFocus={true}
        />
      </View>
      <View style={styles.form}>
        <TouchableOpacity style={styles.button} onPress={() => listarImoveis()}>
          <Text style={styles.buttonText}>Pesquisar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Pesquisar;
