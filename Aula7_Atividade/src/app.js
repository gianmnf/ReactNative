import React from 'react';
import {StatusBar} from 'react-native';
import colors from './styles/colors';
import Routes from './routes';
import {CreateDataBaseService} from './services/createDataBaseService';

function App() {
  CreateDataBaseService();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.fundo} />
      <Routes />
    </>
  );
}

export default App;
