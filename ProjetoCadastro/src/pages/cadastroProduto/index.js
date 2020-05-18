import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/Fontisto';

import Produto from '../../model/produto';

import {ScrollView} from 'react-native-gesture-handler';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import Styles from '../../components/acao/styles';

function CadastroProduto({navigation}) {
  const [idProduto, setIdProduto] = useState(0);
  const [codigoProduto, setCodigoProduto] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('');

  const auth = useSelector(state => state.auth);
  const authProduto = useSelector(state => state.produto);
  const dispatch = useDispatch();

  useEffect(() => {
    inicializar();
  }, []);

  useEffect(() => {
    if (authProduto.navegar === true) {
      navigation.navigate('Main');
      dispatch({type: 'CADASTRAR_PRODUTO_SUCCESS'});
      inicializar();
    }
  }, [authProduto.navegar]);

  async function inicializar() {
    setIdProduto(0);
    setCodigoProduto('');
    setNomeProduto('');
    setValorProduto('');
  }

  function salvar() {
    var produto = new Produto();
    produto.idProduto = idProduto;
    produto.codigoProduto = parseInt(codigoProduto, 10);
    produto.nomeProduto = nomeProduto;
    produto.valorProduto = parseInt(valorProduto, 10);

    dispatch({type: 'CADASTRAR_PRODUTO_REQUEST', produto});
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar barStyle="dark-content" />
        <View style={styles.form}>
          <Text h1 style={styles.textoTitulo}>
            Cadastro de Produtos
          </Text>
          <View style={styles.form}>
            <Icon name="list-1" size={22} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o código do Produto"
              autoCapitalize="none"
              autoCorrect={false}
              value={codigoProduto}
              keyboardType="numeric"
              onChangeText={text => setCodigoProduto(text)}
            />
          </View>
          <View style={styles.form}>
            <Icon name="font" size={22} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o nome do Produto"
              autoCapitalize="none"
              autoCorrect={false}
              value={nomeProduto}
              onChangeText={text => setNomeProduto(text)}
            />
          </View>
          <View style={styles.form}>
            <Icon name="dollar" size={22} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o valor do Produto"
              autoCapitalize="none"
              autoCorrect={false}
              value={valorProduto}
              keyboardType="numeric"
              onChangeText={text => setValorProduto(text)}
            />
          </View>
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => navigation.navigate('Main')}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => salvar()}>
            {auth.loading && <ActivityIndicator size="large" color="white" />}
            {!auth.loading && <Text style={styles.buttonText}>Salvar</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default CadastroProduto;
