import React, {useState, useEffect, useRef} from 'react';
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

function CadastroUsuario({navigation, tipoManutencaoParametro}) {
  const [_id, setID] = useState('');
  const [ideUsuario, setIdeUsuario] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoManutencao, setTipoManutencao] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const ref_email = useRef();
  const ref_ideUsuario = useRef();
  const ref_senha = useRef();

  useEffect(() => {
    inicializar();
  }, []);

  useEffect(() => {
    if (auth.navegar === true && tipoManutencao === 'Inclusao') {
      navigation.navigate('Main');
      dispatch({type: 'SIGN_IN_INICIAL'});
    }
  }, [auth.navegar]);

  async function inicializar() {
    console.tron.log('Meu AUTH: ', auth);
    if (tipoManutencaoParametro !== undefined) {
      setTipoManutencao(tipoManutencaoParametro);
    } else {
      const tipoManutencaoRota = navigation.getParam('tipoManutencaoRota');
      setTipoManutencao(tipoManutencaoRota);
    }

    if (tipoManutencaoParametro === undefined) {
      setIdeUsuario(auth.usuario.IdeUsuario);
      setSenha(auth.usuario.SenhaUsuario);
      setNomeUsuario('');
      setEmail('');
      setID(auth.usuario._id);
    } else {
      setID(auth.usuario._id);
      setIdeUsuario(auth.usuario.IdeUsuario);
      setEmail(auth.usuario.EMail);
      setNomeUsuario(auth.usuario.NomeUsuario);
    }
  }

  function alterarFormatodaSenha() {
    if (secureTextEntry === true) {
      setSecureTextEntry(false);
    } else {
      setSecureTextEntry(true);
    }
  }

  function salvar() {
    var user = new Usuario();
    var tipo = '';
    user._id = _id;
    user.nomeUsuario = nomeUsuario;
    user.ideUsuario = ideUsuario;
    user.senhaUsuario = senha;
    user.email = email;

    console.tron.log('auth', auth);
    if (tipoManutencao === 'Alteracao') {
      tipo = 'A';
    } else if (tipoManutencao === 'Inclusao') {
      tipo = 'C';
    }

    dispatch({type: 'CADASTRAR_USUARIO_REQUEST', user, tipo});
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
            onSubmitEditing={() => ref_ideUsuario.current.focus()}
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
            ref={ref_ideUsuario}
            onSubmitEditing={() => ref_senha.current.focus()}
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
            ref={ref_senha}
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
          {tipoManutencao === 'Inclusao' && (
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={() => salvar()}>
            {auth.loading && <ActivityIndicator size="large" color="white" />}
            {!auth.loading && <Text style={styles.buttonText}>Salvar</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CadastroUsuario;
