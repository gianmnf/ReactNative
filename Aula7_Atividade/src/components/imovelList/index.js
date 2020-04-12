import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AccordionObject from '../../components/accordionObject';
import {View, Text} from 'react-native';

import Styles from './styles';

import {ScrollView} from 'react-native-gesture-handler';

import Imovel from '../imovel';

function ImovelList() {
  const [imoveisList, setImoveisList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'SET_NAVEGACAO_INICIAR'});
  }, []);

  /*function sortMyArray(contacts) {
    return contacts.sort((a, b) => {
      return a.displayName > b.displayName ? 1 : -1;
    });
  } */

  return (
    <View style={Styles.containerPerfil}>
      <ScrollView>
        {imoveisList.map(imovel => {
          return (
            <AccordionObject
              title={imovel.descricaoImovel}
              id={imovel.idImovel}
              icone="user-o"
              children={<Imovel imovel={imovel} />}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default ImovelList;
