import React from 'react';

import {View, Text, ScrollView, Linking, Platform} from 'react-native';

import styles from './styles';

import {useDispatch} from 'react-redux';

function Imovel({imovel}) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Descricao do Imóvel: {imovel.descricaoImovel}
      </Text>
      <ScrollView>
        {imovel.imoveis.map(imovelDetalhes => {
          return (
            <View key={imovel.idImovel} style={styles.containerPhone}>
              <Text style={styles.texto}>{imovelDetalhes.email}</Text>
              <Text style={styles.texto}>
                {imovelDetalhes.logradouroImovel}
              </Text>
              <Text style={styles.texto}>{imovelDetalhes.numero}</Text>
              <Text style={styles.texto}>{imovelDetalhes.complemento}</Text>
              <Text style={styles.texto}>{imovelDetalhes.bairro}</Text>
              <Text style={styles.texto}>{imovelDetalhes.cidade}</Text>
              <Text style={styles.texto}>{imovelDetalhes.cep}</Text>
              <Text style={styles.texto}>{imovelDetalhes.uf}</Text>
              <Text style={styles.texto}>{imovelDetalhes.situacaoImovel}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Imovel;
