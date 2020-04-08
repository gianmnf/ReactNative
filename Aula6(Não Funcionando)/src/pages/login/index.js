import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import RNExitApp from 'react-native-exit-app';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';

//{navigation}

function Login({navigation}) {
  const [ideUsuario, setIdeUsuario] = useState('');
  const [senha, setSenha] = useState('');
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
    setIdeUsuario('');
    setSenha('');
  }

  function alterarFormatodaSenha() {
    if (secureTextEntry === true) {
      setSecureTextEntry(false);
    } else {
      setSecureTextEntry(true);
    }
  }

  function cadastrarUsuario() {
    navigation.navigate('CadastroUsuario');
  }

  function autenticar() {
    var user = {
      ideUsuario: ideUsuario,
      senhaUsuario: senha,
    };
    dispatch({type: 'SIGN_IN_REQUEST', user});
  }

  function cancelar() {
    RNExitApp.exitApp();
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>Bem-vindo</Text>

      <View style={styles.form}>
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
        <View style={styles.containerButtonGeral}>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => cancelar()}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => autenticar()}>
              {auth.loading && <ActivityIndicator size="large" color="white" />}
              {!auth.loading && (
                <Text style={styles.buttonText}>Autenticar</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.containerButtonCadastro}>
            <TouchableOpacity
              style={styles.buttonCadastrar}
              onPress={() => cadastrarUsuario()}>
              <Text style={styles.buttonText}>
                Clique aqui para Cadastrar Usuário
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Login;
