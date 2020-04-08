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
import Detalhar from '../pages/detalhar';
import Ajuda from '../pages/ajuda';
import Sair from '../pages/sair';
import Configuracoes from '../pages/configuracoes';

import Icon from 'react-native-vector-icons/FontAwesome';

import Menu from '../components/menu';
import Acao from '../components/acao';
import NavigationDrawerStructure from '../components/navigationDrawerStructure';

import Colors from '../styles/colors';

const AjudaPage = createStackNavigator({
  First: {
    screen: Ajuda,
    navigationOptions: ({navigation}) => ({
      title: 'Ajuda',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: Colors.fundo,
      },
      headerTintColor: Colors.fundo,
    }),
  },
});

const ConfiguracoesPage = createStackNavigator({
  Config: {
    screen: Configuracoes,
    navigationOptions: ({navigation}) => ({
      title: 'Configuracoes',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: Colors.fundo,
      },
      headerTintColor: Colors.fundo,
    }),
  },
});

const Tab = createMaterialTopTabNavigator(
  {
    // Definir as pastas
    Pasta1: {
      screen: Main,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <Icon
            name="file-code-o"
            size={15}
            color={focused === true ? Colors.white : Colors.whiteTransparent}
          />
        ),
      }),
    },
    Pasta2: {
      screen: Main,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <Icon
            name="hand-pointer-o"
            color={focused === true ? Colors.white : Colors.whiteTransparent}
          />
        ),
      }),
    },
    Pasta3: {
      screen: Main,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <Icon
            name="vcard-o"
            size={15}
            color={focused === true ? Colors.white : Colors.whiteTransparent}
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
      activeTintColor: Colors.white,
      inactiveTintColor: Colors.whiteTransparent,
      labelStyle: {
        fontSize: 8,
      },

      style: {
        backgroundColor: Colors.fundo,
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
        backgroundColor: Colors.fundo,
      },
      headerTintColor: Colors.fundo,
      headerRight: () => <Acao navigation={navigation} />,
      // headerRightContainerStyle : ( { height:200})
    }),
  },
  Detalhar: {
    screen: Detalhar,
    navigationOptions: ({navigation}) => ({
      title: 'Detalhar',
      headerStyle: {
        backgroundColor: Colors.fundo,
      },
      headerTintColor: Colors.white,
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
        backgroundColor: Colors.fundo,
      },
      headerTintColor: Colors.fundo,
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
    Ajuda: AjudaPage,
    Sair: SairPage,
    Hidden: HiddenPage,
    Configuracoes: ConfiguracoesPage,
  },
  {
    contentComponent: Menu,
    initialRouteName: 'Login',
  },
);

export default createAppContainer(DrawerNavigatorMenu);
