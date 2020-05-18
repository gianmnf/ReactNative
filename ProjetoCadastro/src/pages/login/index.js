import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/Fontisto';
import RNExitApp from 'react-native-exit-app';
import {ToastActionsCreators} from 'react-native-redux-toast';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
  ImageBackground,
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
    if (auth.navegar === true && auth.convidado === false) {
      navigation.navigate('CadastroProduto');
      dispatch({type: 'SIGN_IN_INICIAL'});
    }
    if (auth.navegar === true && auth.convidado === true) {
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

  function autenticar() {
    var user = {
      ideUsuario: ideUsuario,
      senhaUsuario: senha,
    };
    if (user.ideUsuario === 'admin' && user.senhaUsuario === 'a') {
      dispatch({type: 'SIGN_IN_REQUEST', user});
    }
  }

  function loginConvidado() {
    var user = {
      ideUsuario: 'convidado',
      senhaUsuario: 'convidado',
    };
    dispatch({type: 'SIGN_IN_REQUEST', user});
  }

  function cancelar() {
    RNExitApp.exitApp();
  }

  return (
    <ImageBackground
      source={require('../../assets/imagens/fundo.jpg')}
      style={styles.imageBkg}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Image
          style={styles.imageStyle}
          source={require('../../assets/imagens/UniStoreClaro.png')}
        />

        <View style={styles.form}>
          <View style={styles.form}>
            <Icon name="male" size={22} style={styles.inlineImg} />
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
            <Icon name="asterisk" size={22} style={styles.inlineImg} />
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
                <Icon name="eye" size={22} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerButtonGeral}>
            <View style={styles.containerButton}>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => cancelar()}>
                <Text style={styles.buttonText}>Sair</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => autenticar()}>
                {auth.loading && (
                  <ActivityIndicator size="large" color="white" />
                )}
                {!auth.loading && <Text style={styles.buttonText}>Entrar</Text>}
              </TouchableOpacity>
            </View>

            <View style={styles.containerButtonCadastro}>
              <TouchableOpacity
                style={styles.buttonCadastrar}
                onPress={() => loginConvidado()}>
                <Text style={styles.buttonTextConvidado}>
                  Clique aqui para entrar como convidado
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Login;
