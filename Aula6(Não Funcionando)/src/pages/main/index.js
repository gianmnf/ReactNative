import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';

import {withNavigationFocus} from 'react-navigation';

import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';

function Main({navigation, isFocused}) {
  const [telas, setTelas] = useState({
    Pasta1: () => NavegarPasta1(),
    Pasta2: () => NavegarPasta2(),
    Pasta3: () => NavegarPasta3(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      telas[`${navigation.state.routeName}`]();
    }
  }, [isFocused]);

  function NavegarPasta1() {
    console.tron.log('NavegarPasta1');
  }
  function NavegarPasta2() {
    console.tron.log('NavegarPasta2');
  }
  function NavegarPasta3() {
    console.tron.log('NavegarPasta3');
  }

  saibaMais = objeto => {
    //navigation.navigate("Detalhar", { objeto });
  };

  return <></>;
}

export default withNavigationFocus(Main);
