import React, {useState} from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  RefreshControl,
} from 'react-native';

import {ToastActionsCreators} from 'react-native-redux-toast';

import {put} from 'redux-saga/effects';

import styles from './styles';

import {useDispatch} from 'react-redux';

import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
} from 'react-native-popup-dialog';

import {deletarImovel} from '../../services/imovelService';

function House({navigation, imovel, id}) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState();

  function alterarImovel(imovelAlt) {
    navigation.navigate('CadastroImovel', {
      tipoManutencaoParametro: 'Alteracao',
      imovel,
    });
  }

  function removerImovel(idRemover) {
    setVisible(false);
    dispatch({type: 'DELETAR_IMOVEL_REQUEST', idRemover});
  }

  return (
    <View style={styles.container}>
      <ScrollView key={imovel.IdImovel}>
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
        <Button
          title="Editar"
          color="#f0ad4e"
          onPress={() => alterarImovel(imovel)}
        />
        <Button title="Remover" color="red" onPress={() => setVisible(true)} />
      </ScrollView>
      {/* Dialog para deletar imóvel */}
      <Dialog
        visible={visible}
        dialogTitle={<DialogTitle title="Remoção de Imóvel" />}
        footer={
          <DialogFooter>
            <DialogButton text="NÃO" onPress={() => setVisible(false)} />
            <DialogButton text="SIM" onPress={() => removerImovel(id)} />
          </DialogFooter>
        }>
        <DialogContent>
          <Text>Deseja remover este imóvel?</Text>
        </DialogContent>
      </Dialog>
    </View>
  );
}

export default House;
