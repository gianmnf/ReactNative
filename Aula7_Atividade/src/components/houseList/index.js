import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AccordionObject from '../../components/accordionObject';
import {View, Text} from 'react-native';

import Styles from './styles';

import {ScrollView} from 'react-native-gesture-handler';

import House from '../house';

function HouseList() {
  const [housesList, setHousesList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'SET_NAVEGACAO_INICIAR'});
    /* lerImoveis(); */
  }, []);

  /*  async function lerImoveis() {
    async () => {

    };
  } */

  /* function sortMyArray(contacts) {
    return contacts.sort((a, b) => {
      return a.displayName > b.displayName ? 1 : -1;
    });
  } */

  return (
    <View style={Styles.containerPerfil}>
      <ScrollView>
        {housesList.map(house => {
          return (
            <AccordionObject
              title={house.descricaoImovel}
              id={house.idImovel}
              icone="user-o"
              children={<House imovel={house} />}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default HouseList;
