import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createMaterialTopTabNavigator,
  createBottomTabNavigator,
} from 'react-navigation-tabs';

import Login from '../pages/login';
import Main from '../pages/main';
import Sair from '../pages/sair';
import CadastroProduto from '../pages/cadastroProduto';
import ProdutoList from '../components/produtoList';

import Icon from 'react-native-vector-icons/Fontisto';

import Menu from '../components/menu';
import Acao from '../components/acao';
import NavigationDrawerStructure from '../components/navigationDrawerStructure';

import Colors from '../styles/colors';

const CadastroProdutoPage = createStackNavigator({
  CadProduto: {
    screen: CadastroProduto,
    navigationOptions: ({navigation}) => ({
      title: 'Cad',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: 'lightyellow',
      },
      headerTintColor: 'lightyellow',
    }),
  },
});

const ProdutoListPage = createStackNavigator({
  Produto: {
    screen: ProdutoList,
    navigationOptions: ({navigation}) => ({
      title: 'Produtos',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: 'lightyellow',
      },
      headerTintColor: 'lightyellow',
    }),
  },
});

const Tab = createMaterialTopTabNavigator(
  {
    // Definir as pastas
    Pasta1: {
      screen: Main,
      navigationOptions: () => ({
        title: 'Lista de Produtos',
        tabBarIcon: ({focused}) => (
          <Icon
            name="shopping-store"
            size={18}
            color={focused === true ? '#000' : '#000'}
          />
        ),
      }),
    },
  },
  // Formatar as pastas
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#000',
      inactiveTintColor: Colors.whiteTransparent,
      labelStyle: {
        fontSize: 8,
      },

      style: {
        backgroundColor: 'lightyellow',
      },
      indicatorStyle: {
        borderBottomColor: Colors.amareloMenu,
        borderBottomWidth: 3,
      },
    },
  },
);

const MainPage = createStackNavigator({
  Second: {
    screen: Tab,
    navigationOptions: ({navigation}) => ({
      title: 'Main',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: 'lightyellow',
      },
      headerTintColor: 'lightyellow',
      headerRight: () => <Acao navigation={navigation} />,
      // headerRightContainerStyle : ( { height:200})
    }),
  },
});

const LoginPage = createStackNavigator({
  Third: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const SairPage = createStackNavigator({
  Fourth: {
    screen: Sair,
    navigationOptions: ({navigation}) => ({
      title: 'Sair',
      headerStyle: {
        backgroundColor: 'lightyellow',
      },
      headerTintColor: 'lightyellow',
    }),
  },
});

const HiddenPage = createStackNavigator({
  Fifth: {
    screen: 'Hidden',
  },
});

const DrawerNavigatorMenu = createDrawerNavigator(
  {
    Main: MainPage,
    Login: LoginPage,
    CadastroProduto: CadastroProdutoPage,
    Sair: SairPage,
    Hidden: HiddenPage,
    ProdutoList: ProdutoListPage,
  },
  {
    contentComponent: Menu,
    initialRouteName: 'Login',
  },
);

export default createAppContainer(DrawerNavigatorMenu);
