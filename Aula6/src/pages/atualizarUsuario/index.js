import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import Usuario from '../../model/usuario';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';

function AtualizarUsuario({navigation}) {
  const [ideUsuario, setIdeUsuario] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    inicializar();
  }, []);

  useEffect(() => {
    if (auth.navegar === true) {
      navigation.navigate('Main');
      dispatch({type: 'SIGN_IN_INICIAL'});
    }
  }, [auth.navegar]);

  async function inicializar() {
    setIdeUsuario(auth.ideUsuario);
    setSenha(auth.senhaUsuario);
    setEmail(auth.usuario.email);
    setNomeUsuario(auth.usuario.nomeUsuario);
    setIdUsuario(auth.usuario.idUsuario);
    console.tron.log(auth);
  }

  function alterarFormatodaSenha() {
    if (secureTextEntry === true) {
      setSecureTextEntry(false);
    } else {
      setSecureTextEntry(true);
    }
  }

  function atualizar() {
    var user = new Usuario();
    user.idUsuario = idUsuario;
    user.nomeUsuario = nomeUsuario;
    user.ideUsuario = ideUsuario;
    user.senhaUsuario = senha;
    user.email = email;
    dispatch({type: 'ATUALIZAR_USUARIO_REQUEST', user});
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.form}>
        <View style={styles.form}>
          <Icon name="id-badge" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Digite o Nome do Usuário"
            autoCapitalize="none"
            autoCorrect={false}
            value={nomeUsuario}
            onChangeText={text => setNomeUsuario(text)}
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
          <Icon name="user-o" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            placeholder="Digite a Identificação do Usuário"
            autoCapitalize="none"
            autoCorrect={false}
            value={ideUsuario}
            onChangeText={text => setIdeUsuario(text)}
          />
        </View>

        <View style={styles.form}>
          <Icon name="lock" size={18} style={styles.inlineImg} />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={secureTextEntry}
            placeholder="Digite a Senha do Usuário"
            value={senha}
            onChangeText={text => setSenha(text)}
          />
          <View style={styles.divOlho}>
            <TouchableOpacity
              style={styles.olho}
              onPress={() => alterarFormatodaSenha()}>
              <Icon name="eye" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => atualizar()}>
            {auth.loading && <ActivityIndicator size="large" color="white" />}
            {!auth.loading && <Text style={styles.buttonText}>Atualizar</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default AtualizarUsuario;
