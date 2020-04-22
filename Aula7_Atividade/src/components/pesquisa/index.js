import React, {useState} from 'react';

import {View, Text, ScrollView} from 'react-native';

import styles from './styles';

import {useDispatch} from 'react-redux';

function Pesquisa({imovel}) {
  const dispatch = useDispatch();

  return (
    <View key={imovel.IdImovel} style={styles.container}>
      <ScrollView>
        <Text style={styles.texto}>
          {' '}
          Descrição do Imóvel: {imovel.DescricaoImovel}
        </Text>
        <Text style={styles.texto}> Email: {imovel.Email}</Text>
        <Text style={styles.texto}> Logradouro: {imovel.LogradouroImovel}</Text>
        <Text style={styles.texto}> Número: {imovel.Numero}</Text>
        <Text style={styles.texto}> Complemento: {imovel.Complemento}</Text>
        <Text style={styles.texto}> Bairro: {imovel.Bairro}</Text>
        <Text style={styles.texto}> Cidade: {imovel.Cidade}</Text>
        <Text style={styles.texto}> CEP: {imovel.CEP}</Text>
        <Text style={styles.texto}> UF: {imovel.UF}</Text>
        <Text style={styles.texto}>
          {' '}
          Situação do Imóvel: {imovel.SituacaoImovel}
        </Text>
      </ScrollView>
    </View>
  );
}

export default Pesquisa;
