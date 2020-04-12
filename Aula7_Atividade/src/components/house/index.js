import React from 'react';

import {View, Text, ScrollView} from 'react-native';

import styles from './styles';

import {useDispatch} from 'react-redux';

function Imovel({imovel}) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nome: {imovel.descricaoImovel}</Text>
      <ScrollView>
        {imovel.houses.map(house => {
          return (
            <View key={house.idImovel} style={styles.containerPhone}>
              <Text style={styles.texto}>{house.email}</Text>
              <Text style={styles.texto}>{house.logradouroImovel}</Text>
              <Text style={styles.texto}>{house.numero}</Text>
              <Text style={styles.texto}>{house.complemento}</Text>
              <Text style={styles.texto}>{house.bairro}</Text>
              <Text style={styles.texto}>{house.cep}</Text>
              <Text style={styles.texto}>{house.uf}</Text>
              <Text style={styles.texto}>{house.situacaoImovel}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Imovel;
