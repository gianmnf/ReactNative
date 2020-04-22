import React, {useState} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';

import {View, ActivityIndicator, Button, TextInput} from 'react-native';
import {SearchBar} from 'react-native-elements';

import {Provider} from 'react-redux';

import PopMenu from '../../components/popMenu';

import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './styles';
import HouseList from '../houseList';

import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
} from 'react-native-popup-dialog';

function Acao({navigation}) {
  const navegacao = useSelector(state => state.navegacao);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [valorPesquisa, setValorPesquisa] = useState('');

  /* function acao1() {
    var objeto = {
      id: 1,
      nome: 'teste',
    };
    navigation.navigate('Detalhar', {objeto});
  } */

  function abrirBusca() {
    setVisible(true);
  }

  function pesquisar(valor) {
    console.log(
      'Navigate resultado: ' +
        navigation.navigate('HouseList', {
          pesquisa: valor,
        }),
    );
    setValorPesquisa('');
    setVisible(false);
  }
  return (
    <View style={Styles.containerAcao}>
      {navegacao.loading && <ActivityIndicator size="large" color="white" />}
      {!navegacao.loading && (
        <Icon name="search" style={Styles.icone} onPress={() => abrirBusca()} />
      )}
      <PopMenu style={Styles.popMenuConteiner} navigation={navigation} />
      <Dialog
        visible={visible}
        dialogTitle={<DialogTitle title="Buscar Imóvel" />}
        footer={
          <DialogFooter>
            <DialogButton text="FECHAR" onPress={() => setVisible(false)} />
            <DialogButton
              text="BUSCAR"
              onPress={() => pesquisar(valorPesquisa)}
            />
          </DialogFooter>
        }>
        <DialogContent>
          <TextInput
            placeholder="Digite a descrição do imóvel que deseja buscar:"
            value={valorPesquisa}
            onChangeText={text => setValorPesquisa(text)}
          />
        </DialogContent>
      </Dialog>
    </View>
  );
}

export default Acao;
