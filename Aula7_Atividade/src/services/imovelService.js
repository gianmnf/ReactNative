import {OpenDataBase} from './database.js';
import Imovel from '../model/imovel';

export function obterPorDescricaoImovel(descricaoImovel) {
  return new Promise((resolve, reject) => {
    try {
      const sql =
        'select * from imovel where lower(descricaoimovel)="' +
        descricaoImovel.toLowerCase() +
        '"';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          if (results.rows.length === 0) {
            reject('Este usuário não possui nenhum imóvel cadastrado.');
          }

          var imovel = montarImovel(results.rows.item(0));

          resolve(imovel);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function obterPorIdUsuario(idUsuario) {
  return new Promise((resolve, reject) => {
    try {
      const sql =
        'select * from imovel where lower(idusuario)="' +
        idUsuario.toLowerCase() +
        '"';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          if (results.rows.length === 0) {
            reject('Imóvel inexistente');
          }

          var imovel = montarImovel(results.rows.item(0));

          resolve(imovel);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function incluirImovel(imovel) {
  return new Promise((resolve, reject) => {
    try {
      var sql =
        'insert into Imovel (DescricaoImovel, Email, LogradouroImovel, Numero, Complemento, Bairro, Cidade,CEP, UF, IdUsuario, SituacaoImovel) ' +
        ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(
          sql,
          [
            imovel.DescricaoImovel,
            imovel.Email,
            imovel.LogradouroImovel,
            imovel.Numero,
            imovel.Complemento,
            imovel.Bairro,
            imovel.Cidade,
            imovel.CEP,
            imovel.UF,
            imovel.IdUsuario,
            imovel.SituacaoImovel,
          ],
          (tx, results) => {
            console.log(results);
            imovel.idImovel = results.insertId;
            resolve(imovel);
          },
        );
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function alterarImovel(imovel) {
  return new Promise((resolve, reject) => {
    try {
      var sql =
        'update Imovel set DescricaoImovel = ?, Email = ?, LogradouroImovel = ?, Numero = ?, Complemento = ?, Bairro = ?, Cidade = ?, CEP = ?, UF = ?, ' +
        ' IdUsuario = ?, SituacaoImovel = ? ' +
        ' where idImovel = ?';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(
          sql,
          [
            imovel.DescricaoImovel,
            imovel.Email,
            imovel.LogradouroImovel,
            imovel.Numero,
            imovel.Complemento,
            imovel.Bairro,
            imovel.Cidade,
            imovel.CEP,
            imovel.UF,
            imovel.IdUsuario,
            imovel.SituacaoImovel,
            imovel.idImovel,
          ],
          (tx, results) => {
            resolve(imovel);
          },
        );
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

function montarImovel(dado) {
  var imovel = new Imovel();
  imovel.idImovel = dado.idImovel;
  imovel.descricaoImovel = dado.descricaoImovel;
  imovel.email = dado.email;
  imovel.logradouroImovel = dado.logradouroImovel;
  imovel.numero = dado.numero;
  imovel.complemento = dado.complemento;
  imovel.bairro = dado.bairro;
  imovel.cidade = dado.cidade;
  imovel.cep = dado.cep;
  imovel.uf = dado.uf;
  imovel.idUsuario = dado.idUsuario;
  imovel.situacaoImovel = dado.situacaoImovel;
  return imovel;
}
