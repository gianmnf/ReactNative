import React, {useState, useEffect} from 'react';

import {useSelector, useDispatch} from 'react-redux';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

function Imovel({navigation, imovelParametro}) {
  const dispatch = useDispatch();
  const [modalVisivel, setModalVisivel] = useState(false);

  const imovel = useSelector(state => state.imovel);

  useEffect(() => {
    if (imovel.atualizado === 'S') {
      navigation.navigate('Main');
      dispatch({type: 'INICIALIZAR_IMOVEL_REQUEST'});
    }
  }, [imovel.atualizado]);

  function editarImovel(imovelParametro) {
    navigation.navigate('Imovel', {
      tipoManutencaoParametro: 'Alteracao',
      imovel: imovelParametro,
    });
    dispatch({type: 'ALTERAR_IMOVEL_REQUEST'});
  }

  function excluirImovel(imovelParametro) {
    dispatch({type: 'DELETAR_IMOVEL_REQUEST', imovel: imovelParametro});
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.buttonEdit}
            onPress={() => editarImovel(imovelParametro)}>
            <Text style={styles.buttonText}>Alterar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => {
              setModalVisivel(true);
            }}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.texto}>Cidade: {imovelParametro.Cidade}</Text>
        <Text style={styles.texto}>UF: {imovelParametro.Uf}</Text>
        <Text style={styles.texto}>
          Logradouro: {imovelParametro.Logradouro}
        </Text>
        <Text style={styles.texto}>Numero: {imovelParametro.Numero}</Text>
        <Text style={styles.texto}>Bairro: {imovelParametro.Bairro}</Text>
        {imovelParametro.Complemento != '' && (
          <Text style={styles.texto}>
            Complemento: {imovelParametro.Complemento}
          </Text>
        )}
        <Text style={styles.texto}>CEP: {imovelParametro.Cep}</Text>
        <Text style={styles.texto}>Email: {imovelParametro.EMail}</Text>
        <Text style={styles.texto}>
          Descrição: {imovelParametro.DescricaoImovel}
        </Text>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Deseja deletar esse imóvel?</Text>
            <View style={styles.containerButton}>
              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#b00522'}}
                onPress={() => {
                  setModalVisivel(!modalVisivel);
                }}>
                <Text style={styles.textStyle}>
                  <Icon name="times" size={18} style={styles.inlineImg} />
                </Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{...styles.openButton, backgroundColor: '#56b80b'}}
                onPress={() => {
                  excluirImovel(imovelParametro);
                  setModalVisivel(!modalVisivel);
                }}>
                <Text style={styles.textStyle}>
                  <Icon name="trash" size={18} style={styles.inlineImg} />
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Imovel;
