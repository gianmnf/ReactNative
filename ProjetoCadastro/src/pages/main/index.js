import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, connect} from 'react-redux';

import {withNavigationFocus} from 'react-navigation';
import ProdutoList from '../../components/produtoList';

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
  });
  const [tab, setTab] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      telas[`${navigation.state.routeName}`]();
    }
  }, [isFocused]);

  function NavegarPasta1() {
    setTab(1);
  }

  if (tab === 1) {
    return <ProdutoList navigation={navigation} />;
  }
}

export default withNavigationFocus(Main);
