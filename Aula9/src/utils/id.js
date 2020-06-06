import {useState} from 'react';

export default function Verificar(param, id) {
  const [UserID, setUserID] = useState('');
  if (param === 'E') {
    setUserID(id);
    return console.tron.log('OK!');
  } else if (param === 'R' && id === '') {
    return UserID;
  }
}
