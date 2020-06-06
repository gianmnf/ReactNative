import AsyncStorage from '@react-native-community/async-storage';

export default async function(tipoHeader) {
  switch (tipoHeader) {
    case 'SEM_TOKEN_FORM': {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      };
      return headers;
    }
    case 'COM_TOKEN_USUARIO': {
      const token = await AsyncStorage.getItem('@Aula:token');

      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token,
      };

      return headers;
    }
    case 'SEM_TOKEN_JSON': {
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      };
      return headers;
    }
    case 'COM_TOKEN_PUBLICO': {
      const token = await AsyncStorage.getItem('@Aula:tokenPublico');
      const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + token,
      };
      return headers;
    }
    case 'MULTPART': {
      const headers = {
        'content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      };
      return headers;
    }
    default:
      return {};
  }
}
