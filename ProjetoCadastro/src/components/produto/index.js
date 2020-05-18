import React, {useState} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  FlatListProperties,
} from 'react-native';

import {Button} from 'react-native-elements';

import {ToastActionsCreators} from 'react-native-redux-toast';

import {put} from 'redux-saga/effects';

import styles from './styles';

import {useDispatch} from 'react-redux';

import Prod from '../../../src/model/produto';

import Icon from 'react-native-vector-icons/Fontisto';

function Produto({navigation, produto, id}) {
  const dispatch = useDispatch();

  function adicionarLista(p) {
    var prod = new Prod();
    prod.idProduto = p.IdProduto;
    prod.nomeProduto = p.NomeProduto;
    prod.valorProduto = p.ValorProduto;
    prod.codigoProduto = p.CodigoProduto;
    dispatch({type: 'ADICIONAR_LISTA_REQUEST', prod});
  }

  return (
    <View style={styles.container}>
      <ScrollView key={produto.IdProduto}>
        <Text style={styles.texto}>
          {' '}
          Nome do Produto: {produto.NomeProduto}
        </Text>
        <Text style={styles.texto}>
          {' '}
          Código do Produto: {produto.CodigoProduto}
        </Text>
        <Text style={styles.texto}> Valor: R$ {produto.ValorProduto}</Text>
        <Button
          color="#f0ad4e"
          icon={<Icon name="prescription" size={20} color="white" />}
          title=" Adicionar a lista de compras"
          onPress={() => adicionarLista(produto)}
        />
      </ScrollView>
    </View>
  );
}

export default Produto;
