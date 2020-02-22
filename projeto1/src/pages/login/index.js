import React, {useState, useEffect} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import RNExitApp from 'react-native-exit-app';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
  BackHandler,
} from 'react-native';

import styles from './styles';

//{navigation}

function Login({navigation}) {
  const [ideUsuario, setIdeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    inicializar();
  }, []);

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

  function autenticar() {
    if (ideUsuario === '') {
      alert('Usuário não informado');
      return;
    }

    if (senha === '') {
      alert('Senha não informada');
      return;
    }
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
            placeholder="Digite o usuário do portal"
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
            placeholder="Digite a senha do portal"
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
            onPress={() => cancelar()}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => autenticar()}>
            <Text style={styles.buttonText}>Autenticar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Login;
