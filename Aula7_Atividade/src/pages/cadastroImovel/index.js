import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import Imovel from '../../model/imovel';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';

function CadastroImovel({navigation, tipoManutencaoParametro}) {
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
    var imovel = new Imovel();
    imovel.descricaoImovel = descricaoImovel;
    imovel.email = email;
    imovel.logradouroImovel = logradouroImovel;
    imovel.numero = numero;
    imovel.complemento = complemento;
    imovel.bairro = bairro;
    imovel.cidade = cidade;
    imovel.cep = cep;
    imovel.uf = uf;
    imovel.idUsuario = idUsuario;
    imovel.situacaoImovel = situacaoImovel;

    dispatch({type: 'CADASTRAR_IMOVEL_REQUEST', imovel});
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.form}>
        <View style={styles.form}>
          <Icon name="id-badge" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Digite a descrição do Imóvel"
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
            placeholder="Digite o Email"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.form}>
          <Icon name="at" size={18} style={styles.inlineImg} />
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
          <Icon name="at" size={18} style={styles.inlineImg} />
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
          <Icon name="at" size={18} style={styles.inlineImg} />
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
          <Icon name="at" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Digite o Bairro"
            autoCapitalize="none"
            autoCorrect={false}
            value={bairro}
            onChangeText={text => setBairro(text)}
          />
        </View>

        <View style={styles.form}>
          <Icon name="at" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Digite a Cidade"
            autoCapitalize="none"
            autoCorrect={false}
            value={cidade}
            onChangeText={text => setCidade(text)}
          />
        </View>

        <View style={styles.form}>
          <Icon name="at" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Digite o CEP"
            autoCapitalize="none"
            autoCorrect={false}
            value={cep}
            onChangeText={text => setCep(text)}
          />
        </View>

        <View style={styles.form}>
          <Icon name="at" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Digite a UF"
            autoCapitalize="none"
            autoCorrect={false}
            value={uf}
            onChangeText={text => setUf(text)}
          />
        </View>

        <View style={styles.form}>
          <Icon name="at" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Digite a situação do Imóvel"
            autoCapitalize="none"
            autoCorrect={false}
            value={situacaoImovel}
            onChangeText={text => setSituacaoImovel(text)}
          />
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => salvar()}>
            {auth.loading && <ActivityIndicator size="large" color="white" />}
            {!auth.loading && <Text style={styles.buttonText}>Salvar</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CadastroImovel;
