import React  from 'react'; 
import {   StatusBar } from 'react-native';
 
import colors from './styles/colors';

import Routes from './routes'
import Login from './pages/login';

function App() {

  return (

    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.amareloMenu} />
      <Routes />
    </>
  );
}

export default App;