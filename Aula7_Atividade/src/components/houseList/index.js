/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AccordionObject from '../../components/accordionObject';
import {View, Text, Button} from 'react-native';

import Styles from './styles';

import {ScrollView} from 'react-native-gesture-handler';

import House from '../house';

import {obterPorIdUsuario, obterPesquisa} from '../../services/imovelService';

function HouseList({navigation}) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const imovelState = useSelector(state => state.imovel);
  const [imovelList, setImovelList] = useState([]);
  const [parametro, setParametro] = useState('');

  async function lerImoveis() {
    setParametro(await navigation.dangerouslyGetParent().getParam('pesquisa'));
    if (parametro === undefined) {
      await obterPorIdUsuario(auth.usuario.idUsuario)
        .then(res => {
          setImovelList(res);
          console.tron.log(res);
        })
        .catch(err => {
          console.tron.log(err);
        });
    } else {
      await obterPesquisa(parametro)
        .then(res => {
          setImovelList(res);
          console.tron.log(res);
        })
        .catch(err => {
          console.tron.log(err);
        });
    }
    dispatch({type: 'SET_NAVEGACAO_FINALIZAR'});
  }

  useEffect(() => {
    lerImoveis();
  }, [imovelState.imovel]);

  useEffect(() => {
    lerImoveis();
  }, [imovelState.modificado]);

  function voltar() {
    navigation.navigate('Main');
  }

  return (
    <View style={Styles.containerPerfil}>
      <ScrollView>
        {parametro !== undefined ? (
          <Text h1 style={Styles.pesquisaTexto}>
            Resultados da Pesquisa
          </Text>
        ) : null}
        {imovelList.map(imovel => {
          return (
            <AccordionObject
              title={
                'Descrição:' +
                imovel.DescricaoImovel +
                ' Logradouro:' +
                imovel.LogradouroImovel +
                ' Número: ' +
                imovel.Numero
              }
              id={imovel.IdImovel}
              icone="home"
              children={
                <House
                  imovel={imovel}
                  navigation={navigation}
                  id={imovel.IdImovel}
                />
              }
            />
          );
        })}
        {parametro !== undefined ? (
          <Button title="Voltar" color="#00ccff" onPress={() => voltar()} />
        ) : null}
      </ScrollView>
    </View>
  );
}

export default HouseList;
