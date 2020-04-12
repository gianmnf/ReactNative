import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import Imovel from '../../model/imovel';

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

function CadastroImovel({navigation}) {
  const [descricaoImovel, setDescricaoImovel] = useState('');
  const [email, setEmail] = useState('');
  const [logradouroImovel, setLogradouroImovel] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [situacaoImovel, setSituacaoImovel] = useState('');

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    inicializar();
  }, []);

  async function inicializar() {
    setDescricaoImovel('');
    setEmail('');
    setLogradouroImovel('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setCidade('');
    setCep('');
    setUf('');
    setIdUsuario(auth.usuario.idUsuario);
    setSituacaoImovel('');
  }

  function salvar() {
    var house = new Imovel();
    house.idUsuario = idUsuario;
    house.descricaoImovel = descricaoImovel;
    house.email = email;
    house.logradouroImovel = logradouroImovel;
    house.numero = parseInt(numero, 10);
    house.complemento = complemento;
    house.bairro = bairro;
    house.cidade = cidade;
    house.cep = parseInt(cep, 10);
    house.uf = uf;
    house.situacaoImovel = situacaoImovel;

    dispatch({type: 'CADASTRAR_IMOVEL_REQUEST', house});
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <View style={styles.form}>
          <View style={styles.form}>
            <Icon name="align-justify" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite a Descricao do Imovel"
              autoCapitalize="none"
              autoCorrect={false}
              value={descricaoImovel}
              onChangeText={text => setDescricaoImovel(text)}
            />
          </View>
          <View style={styles.form}>
            <Icon name="at" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o Email do Usuário"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.form}>
            <Icon name="road" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o Logradouro do Imóvel"
              autoCapitalize="none"
              autoCorrect={false}
              value={logradouroImovel}
              onChangeText={text => setLogradouroImovel(text)}
            />
          </View>
          <View style={styles.form}>
            <Icon name="asterisk" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o Número do Imóvel"
              autoCapitalize="none"
              autoCorrect={false}
              value={numero}
              onChangeText={text => setNumero(text)}
            />
          </View>
          <View style={styles.form}>
            <Icon name="ellipsis-h" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o Complemento do Imóvel"
              autoCapitalize="none"
              autoCorrect={false}
              value={complemento}
              onChangeText={text => setComplemento(text)}
            />
          </View>
          <View style={styles.form}>
            <Icon name="building" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o Bairro onde se encontra o Imóvel"
              autoCapitalize="none"
              autoCorrect={false}
              value={bairro}
              onChangeText={text => setBairro(text)}
            />
          </View>
          <View style={styles.form}>
            <Icon name="map" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite a Cidade onde se encontra o Imóvel"
              autoCapitalize="none"
              autoCorrect={false}
              value={cidade}
              onChangeText={text => setCidade(text)}
            />
          </View>
          <View style={styles.form}>
            <Icon name="map" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o CEP do Imóvel"
              autoCapitalize="none"
              autoCorrect={false}
              value={cep}
              maxLength={8}
              onChangeText={text => setCep(text)}
            />
          </View>
          <View style={styles.form}>
            <Icon name="map" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite a UF"
              autoCapitalize="none"
              autoCorrect={false}
              value={uf}
              maxLength={2}
              onChangeText={text => setUf(text)}
            />
          </View>
          <View style={styles.form}>
            <Icon name="question" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite a Situação do Imóvel"
              autoCapitalize="none"
              autoCorrect={false}
              value={situacaoImovel}
              maxLength={1}
              onChangeText={text => setSituacaoImovel(text)}
            />
          </View>
        </View>

        <View style={styles.containerButton}>
          {/* {tipoManutencao === 'Inclusao' && ( */}
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => navigation.navigate('Main')}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          {/* )} */}
          <TouchableOpacity style={styles.button} onPress={() => salvar()}>
            {auth.loading && <ActivityIndicator size="large" color="white" />}
            {!auth.loading && <Text style={styles.buttonText}>Salvar</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default CadastroImovel;
