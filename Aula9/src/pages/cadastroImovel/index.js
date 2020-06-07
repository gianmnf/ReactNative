import React, {useState, useEffect, useRef} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

import {useSelector, useDispatch} from 'react-redux';

import Imovel from '../../model/imovel';
import {ScrollView} from 'react-native-gesture-handler';

import axios from 'axios';

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
  const [_id, setID] = useState('');
  const [descricaoImovel, setDescricaoImovel] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [usuario, setUsuario] = useState('');
  const [operacao, setOperacao] = useState('');

  const auth = useSelector(state => state.auth);
  const imovel = useSelector(state => state.imovel);
  const dispatch = useDispatch();

  const ref_email = useRef();
  const ref_cep = useRef();
  const ref_numero = useRef();
  const ref_complemento = useRef();

  useEffect(() => {
    inicializar();
  }, []);

  useEffect(() => {
    if (imovel.atualizado === 'S') {
      navigation.navigate('Main');
      dispatch({type: 'INICIALIZAR_IMOVEL_REQUEST'});
    }
  }, [imovel.atualizado]);

  useEffect(() => {
    inicializar();
  }, [imovel]);

  function inicializar() {
    setUsuario(auth.usuario._id);

    const tipoManutencao = navigation
      .dangerouslyGetParent()
      .getParam('tipoManutencaoParametro');
    const imovel = navigation.dangerouslyGetParent().getParam('imovel');

    if (tipoManutencao === undefined) {
      setOperacao('C');
    }

    if (tipoManutencao === 'Alteracao') {
      setDescricaoImovel(imovel.DescricaoImovel);
      setEmail(imovel.EMail);
      setLogradouro(imovel.Logradouro);
      setComplemento(imovel.Complemento);
      setBairro(imovel.Bairro);
      setCidade(imovel.Cidade);
      setCep(imovel.Cep);
      setUf(imovel.Uf);
      setID(imovel._id);
      setNumero(imovel.Numero);
      setOperacao('A');
    }
  }

  function salvar() {
    var imovel = new Imovel();

    imovel.usuario = usuario;
    imovel._id = _id;
    imovel.descricaoImovel = descricaoImovel;
    imovel.email = email;
    imovel.numero = numero;
    imovel.logradouro = logradouro;
    imovel.complemento = complemento;
    imovel.bairro = bairro;
    imovel.cidade = cidade;
    imovel.cep = cep;
    imovel.uf = uf;
    imovel.situacaoImovel = 'A';

    dispatch({type: 'CADASTRAR_IMOVEL_REQUEST', imovel, operacao});
  }

  const consultaCEP = async () => {
    const url = 'https://viacep.com.br/ws/' + cep + '/json/';
    await axios
      .get(url)
      .then(res => {
        setLogradouro(res.data.logradouro);
        setComplemento(res.data.complemento);
        setBairro(res.data.bairro);
        setCidade(res.data.localidade);
        setUf(res.data.uf);
        ref_numero.current.focus();
      })
      .catch(err => {
        var mensagem = {
          tipo: 1,
          texto: 'CEP inválido',
        };
        console.tron.log(err);
        dispatch({type: 'SET_MENSAGEM', mensagem});
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.form}>
            <Icon name="home" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              multiline
              numberOfLines={4}
              placeholder="Digite a Descrição do Imóvel"
              autoCapitalize="none"
              autoCorrect={false}
              value={descricaoImovel}
              onChangeText={text => setDescricaoImovel(text)}
              autoFocus={true}
              onSubmitEditing={() => ref_email.current.focus()}
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
              ref={ref_email}
              onSubmitEditing={() => ref_cep.current.focus()}
            />
          </View>

          <View style={styles.formCEP}>
            <Icon name="map" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.inputCep}
              placeholder="Digite o CEP do Imóvel"
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              value={cep}
              onChangeText={text => setCep(text)}
              ref={ref_cep}
            />
            <TouchableOpacity
              style={styles.buttonCep}
              onPress={() => consultaCEP()}>
              <Text style={styles.buttonText}>
                <Icon name="search" size={18} style={styles.inlineImg} />
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Icon name="road" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o Logradouro do Imóvel"
              autoCapitalize="none"
              autoCorrect={false}
              value={logradouro}
              editable={false}
              onChangeText={text => setLogradouro(text)}
            />
          </View>

          <View style={styles.form}>
            <Icon name="list-ol" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o Numero do Imóvel"
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              value={numero}
              onChangeText={text => setNumero(text)}
              ref={ref_numero}
              onSubmitEditing={() => ref_complemento.current.focus()}
            />
          </View>

          <View style={styles.form}>
            <Icon name="info-circle" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o Complemento"
              autoCapitalize="none"
              autoCorrect={false}
              value={complemento}
              onChangeText={text => setComplemento(text)}
              ref={ref_complemento}
            />
          </View>

          <View style={styles.form}>
            <Icon name="map-marker" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o Bairro"
              autoCapitalize="none"
              autoCorrect={false}
              value={bairro}
              editable={false}
              onChangeText={text => setBairro(text)}
            />
          </View>

          <View style={styles.form}>
            <Icon name="building" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite a Cidade"
              autoCapitalize="none"
              autoCorrect={false}
              value={cidade}
              editable={false}
              onChangeText={text => setCidade(text)}
            />
          </View>

          <View style={styles.form}>
            <Icon name="flag" size={18} style={styles.inlineImg} />
            <TextInput
              style={styles.input}
              placeholder="Digite o Estado"
              autoCapitalize="none"
              autoCorrect={false}
              value={uf}
              editable={false}
              onChangeText={text => setUf(text)}
            />
          </View>

          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button} onPress={() => salvar()}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default CadastroImovel;
