import axios from 'axios';
import Headers from './headers';

const baseURL = 'http://192.168.1.102:5006';

export async function post(url, tipoHeader, data, converterData) {
  const headers = await Headers(tipoHeader);

  let parametro = data;
  if (converterData === 'S') {
    parametro = JSON.stringify(data);
  }

  var urlAcesso = baseURL + url;

  return await axios.post(urlAcesso, parametro, {
    headers,
  });
}

export async function get(url, tipoHeader) {
  const headers = await Headers(tipoHeader);

  var urlAcesso = baseURL + url;

  return await axios.get(urlAcesso, {
    headers,
  });
}

export async function deleteAxios(url, tipoHeader) {
  const headers = await Headers(tipoHeader);

  var urlAcesso = baseURL + url;

  return await axios.delete(urlAcesso, {
    headers,
  });
}

export async function putAxios(url, tipoHeader, data, converterData) {
  const headers = await Headers(tipoHeader);

  let parametro = data;
  if (converterData === 'S') {
    parametro = JSON.stringify(data);
  }

  var urlAcesso = baseURL + url;

  return await axios.put(urlAcesso, parametro, {
    headers,
  });
}
