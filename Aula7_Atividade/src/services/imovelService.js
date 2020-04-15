import {OpenDataBase} from './database.js';
import Imovel from '../model/imovel';

export function obterPorIdUsuario(idUsuario) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `select * from imovel where idUsuario=${idUsuario}`;

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          if (results.rows.length === 0) {
            reject('Este usuário não possui nenhum imóvel cadastrado.');
          }

          var imovel = montarImovel(results);

          resolve(imovel);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}
export function incluirImovel(imovel) {
  console.tron.log(JSON.stringify(imovel, '\n'));
  return new Promise((resolve, reject) => {
    try {
      var sql =
        'insert into Imovel (DescricaoImovel,Email,LogradouroImovel,Numero,Complemento,Bairro,Cidade,CEP,UF,IdUsuario,SituacaoImovel) ' +
        ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(
          sql,
          [
            imovel.descricaoImovel,
            imovel.email,
            imovel.logradouroImovel,
            imovel.numero,
            imovel.complemento,
            imovel.bairro,
            imovel.cidade,
            imovel.cep,
            imovel.uf,
            imovel.idUsuario,
            imovel.situacaoImovel,
          ],
          (tx, results) => {
            console.tron.log('chegou no resolve');
            imovel.idImovel = results.insertId;
            resolve(imovel);
          },
        );
      });
    } catch (err) {
      console.tron.log('chegou no catch: ' + err.message);
      reject(err.message);
    }
  });
}

function montarImovel(dado) {
  let imoveis = [];

  for (let i = 0; i < dado.rows.length; i++) {
    imoveis[i] = dado.rows.item(i);
  }

  return imoveis;
}
