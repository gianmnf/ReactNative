/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AccordionObject from '../accordionObject';
import {View, Text, Button} from 'react-native';

import Styles from './styles';

import {ScrollView} from 'react-native-gesture-handler';

import Produto from '../produto';

import {obterProdutos} from '../../services/produtoService';

function ProdutoList({navigation}) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const produtoState = useSelector(state => state.produto);
  const [produtoList, setProdutoList] = useState([]);

  async function lerProduto() {
    await obterProdutos()
      .then(res => {
        setProdutoList(res);
      })
      .catch(err => {
        console.tron.log(err);
      });
    dispatch({type: 'SET_NAVEGACAO_FINALIZAR'});
  }

  useEffect(() => {
    lerProduto();
  }, [produtoState.produto]);

  useEffect(() => {
    lerProduto();
  }, [produtoState.modificado]);

  function voltar() {
    navigation.navigate('Main');
  }

  return (
    <View style={Styles.containerPerfil}>
      <ScrollView>
        {produtoList.map(produto => {
          return (
            <AccordionObject
              title={' Nome: ' + produto.NomeProduto}
              id={produto.IdProduto}
              icone="shopping-bag"
              children={
                <Produto
                  produto={produto}
                  navigation={navigation}
                  id={produto.IdProduto}
                />
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default ProdutoList;
