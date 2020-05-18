import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {View, ActivityIndicator, Text, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/Fontisto';
import Styles from './styles';

import {Badge} from 'react-native-elements';

import {obterLista, limparLista} from '../../services/produtoService';

import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
} from 'react-native-popup-dialog';
import {ScrollView} from 'react-native-gesture-handler';

function Acao({navigation}) {
  const navegacao = useSelector(state => state.navegacao);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [lista, setLista] = useState([]);

  function sair() {
    navigation.navigate('Sair');
  }

  async function lerLista() {
    await obterLista()
      .then(res => {
        setLista(res);
      })
      .catch(err => {
        console.tron.log(err);
      });
    dispatch({type: 'SET_NAVEGACAO_FINALIZAR'});
  }

  function abrirLista() {
    lerLista();
    setVisible(true);
  }

  async function limparListaCompras() {
    await limparLista()
      .then(res => {
        setLista(res);
        setVisible(false);
      })
      .catch(err => {
        console.tron.log(err);
      });
    dispatch({type: 'SET_NAVEGACAO_FINALIZAR'});
  }

  return (
    <View style={Styles.containerAcao}>
      {navegacao.loading && <ActivityIndicator size="large" color="white" />}
      <Badge status="error" value={lista.length} />
      {!navegacao.loading && (
        <Icon
          name="shopping-basket"
          style={Styles.icone}
          onPress={() => abrirLista()}
        />
      )}
      <Icon name="power" style={Styles.icone} onPress={() => sair()} />
      <Dialog
        visible={visible}
        width={300}
        height={500}
        footer={
          <DialogFooter>
            <DialogButton
              text="Fechar"
              onPress={() => {
                setVisible(false);
              }}
            />
            <DialogButton
              text="Limpar Lista"
              onPress={() => {
                limparListaCompras();
              }}
            />
          </DialogFooter>
        }>
        <DialogContent>
          <Text>
            {'\n'} Itens na sua Lista:{'\n'}
          </Text>
          <FlatList
            data={lista}
            renderItem={({item}) => (
              <ScrollView>
                <View style={Styles.item}>
                  <Text style={Styles.textoItem}>
                    Código do Produto: {item.codigoProduto}
                  </Text>
                  <Text style={Styles.textoItem}>
                    Nome do Produto: {item.nomeProduto}
                  </Text>
                  <Text style={Styles.textoItem}>
                    Valor do Produto: R$ {item.valorProduto}
                  </Text>
                </View>
              </ScrollView>
            )}
            keyExtractor={item => item.idProduto}
          />
        </DialogContent>
      </Dialog>
    </View>
  );
}

export default Acao;
