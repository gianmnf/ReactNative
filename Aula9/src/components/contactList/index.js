import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AccordionObject from '../../components/accordionObject';
import {View, Text} from 'react-native';

import Styles from './styles';

import {ScrollView} from 'react-native-gesture-handler';

import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';

import Contact from '../contact';

function ContactList() {
  const [contactsList, setContactsList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'SET_NAVEGACAO_INICIAR'});
    lerContatos();
  }, []);

  async function lerContatos() {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contatos',
      message: 'Este aplicativo gostaria de ver os seus contatos.',
      buttonPositive: 'Por favor, clique em aceitar',
    }).then(async () => {
      Contacts.getAll(async (err, contacts) => {
        if (err === 'denied') {
          setContactsList([]);
        } else {
          // const newArr = contacts.filter(obj =>
          //   obj.displayName.find(o => o.value === 'Abel'),
          // );
          // console.tron.log('Filtro');
          //console.tron.log(newArr);
          //console.tron.log(contacts);
          setContactsList(await sortMyArray(contacts));
          dispatch({type: 'SET_NAVEGACAO_FINALIZAR'});
        }
      });
    });
  }

  function sortMyArray(contacts) {
    return contacts.sort((a, b) => {
      return a.displayName > b.displayName ? 1 : -1;
    });
  }

  return (
    <View style={Styles.containerPerfil}>
      <ScrollView>
        {contactsList.map(contact => {
          return (
            <AccordionObject
              title={contact.displayName}
              id={contact.rawContactId}
              icone="user-o"
              children={<Contact contato={contact} />}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default ContactList;
