import React from 'react';

import {View, Text, ScrollView, Linking, Platform} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

import {useDispatch} from 'react-redux';

function Contact({contato}) {
  const dispatch = useDispatch();

  function ligar(phone) {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }

    console.tron.log(phoneNumber);
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          var mensagem = {
            tipo: 1,
            texto: 'Telefone não disponível',
          };
          dispatch({type: 'SET_MENSAGEM', mensagem});
          console.tron.log('Telefone não disponível');
        } else {
          var mensagem = {
            tipo: 1,
            texto: 'Telefone ' + phoneNumber,
          };
          dispatch({type: 'SET_MENSAGEM', mensagem});
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => {
        var mensagem = {
          tipo: 1,
          texto: err,
        };
        dispatch({type: 'SET_MENSAGEM', mensagem});

        console.tron.log(err);
      });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nome: {contato.displayName}</Text>
      <ScrollView>
        {contato.phoneNumbers.map(phone => {
          return (
            <View key={phone.id} style={styles.containerPhone}>
              <Text style={styles.texto}>{phone.label}</Text>
              <Text style={styles.texto}>{phone.number}</Text>
              <Icon
                name="phone"
                style={styles.icone}
                onPress={() => ligar(phone.number)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Contact;
