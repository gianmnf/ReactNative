import React  from 'react'; 
import {   StatusBar } from 'react-native';
 
import colors from './styles/colors';

import Login from './pages/login'

function App() {

  return (

    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.fundo} />
      <Login />
    </>
  );
}

export default App;