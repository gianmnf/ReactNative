import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AccordionObject from '../../components/accordionObject';
import {View, Text, TouchableOpacity} from 'react-native';

import Styles from './styles';

import {ScrollView} from 'react-native-gesture-handler';
import {obterTodosImoveis} from '../../services/imovelService';

import Imovel from '../imovel';

function ImovelList({navigation}) {
  const [imovelList, setImovelList] = useState([]);
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const imovel = useSelector(state => state.imovel);
  console.tron.log('Dentro do Listar Imoveis1111');
  useEffect(() => {
    console.tron.log('Dentro do Listar Imoveis');
    lerImoveis();
  }, []);

  useEffect(() => {
    if (imovel.atualizado === 'S') {
      lerImoveis();
      dispatch({type: 'INICIALIZAR_IMOVEL_REQUEST'});
    }
    if (imovel.atualizado === 'L') {
      setImovelList(imovel.imoveis);
      dispatch({type: 'INICIALIZAR_IMOVEL_REQUEST'});
    }
  }, [imovel.atualizado]);

  function lerImoveis() {
    var action = {
      idUsuario: auth.usuario.idUsuario,
      descricaoImovel: '',
    };

    dispatch({type: 'PESQUISAR_IMOVEL_REQUEST', action});
  }

  return (
    <View style={Styles.containerPerfil}>
      <ScrollView>
        {imovelList.map(imovel => {
          return (
            <AccordionObject
              title={
                imovel.descricaoImovel +
                ' Nº ' +
                imovel.numero +
                ', ' +
                imovel.cidade
              }
              id={imovel.idImovel}
              icone="home"
              children={
                <Imovel imovelParametro={imovel} navigation={navigation} />
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default ImovelList;
