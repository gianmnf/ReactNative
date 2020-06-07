import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AccordionObject from '../../components/accordionObject';
import {View, Text, TouchableOpacity} from 'react-native';

import Styles from './styles';

import {ScrollView} from 'react-native-gesture-handler';

import Imovel from '../imovel';

function ImovelList({navigation}) {
  const [imovelList, setImovelList] = useState([]);
  const [imovelListPesquisa, setImovelListPesquisa] = useState([]);
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const imovel = useSelector(state => state.imovel);

  useEffect(() => {
    lerImoveis();
  }, []);

  useEffect(() => {
    if (imovel.atualizado === 'S') {
      lerImoveis();
      dispatch({type: 'INICIALIZAR_IMOVEL_REQUEST'});
    }
    if (imovel.atualizado === 'L') {
      if (imovel.imoveis.imovelList.length === undefined) {
        setImovelList(imovel.imoveis.imovelList.docs);
      } else {
        setImovelList(imovel.imoveis.imovelList);
      }
      dispatch({type: 'INICIALIZAR_IMOVEL_REQUEST'});
    }
  }, [imovel.atualizado]);

  function lerImoveis() {
    dispatch({type: 'PESQUISAR_IMOVEL_REQUEST', imovel: ''});
  }

  return (
    <View style={Styles.containerPerfil}>
      <ScrollView>
        {imovelList.map(imovelData => {
          return (
            <AccordionObject
              title={
                imovelData.DescricaoImovel +
                ' Nº ' +
                imovelData.Numero +
                ', ' +
                imovelData.Cidade
              }
              id={imovelData._id}
              icone="home"
              children={
                <Imovel imovelParametro={imovelData} navigation={navigation} />
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default ImovelList;
