import {OpenDataBase} from './database.js';
import Imovel from '../model/imovel';

export function incluirImovel(imovel) {
  return new Promise((resolve, reject) => {
    try {
      var sql =
        'insert into Imovel (descricaoImovel,' +
        ' email,' +
        ' logradouroImovel,' +
        ' numero,' +
        ' complemento,' +
        ' bairro,' +
        ' cidade,' +
        ' cep,' +
        ' uf,' +
        ' idUsuario,' +
        ' situacaoImovel) ' +
        ' values ("' +
        imovel.descricaoImovel +
        '",' +
        '"' +
        imovel.email +
        '",' +
        '"' +
        imovel.logradouroImovel +
        '",' +
        '"' +
        imovel.numero +
        '",' +
        '"' +
        imovel.complemento +
        '",' +
        '"' +
        imovel.bairro +
        '",' +
        '"' +
        imovel.cidade +
        '",' +
        '"' +
        imovel.cep +
        '",' +
        '"' +
        imovel.uf +
        '",' +
        '"' +
        imovel.idUsuario +
        '",' +
        '"' +
        imovel.situacaoImovel +
        '")';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          imovel.idImovel = results.insertId;
          resolve(imovel);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function obterTodosImoveis(idUsuario, descricaoImovel) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `select * from Imovel where IdUsuario=${idUsuario} and descricaoImovel like '%${descricaoImovel}%'`;

      console.tron.log(sql);

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          if (results.rows.length === 0) {
            reject('Não existe imoveis cadastrados');
          }

          var imoveis = montarImovel(results);
          resolve(imoveis);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function obterImoveisComDescricao(descricao) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `select * from Imovel where DescricaoImovel like '%${descricao}%'`;

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          if (results.rows.length === 0) {
            reject(
              `Não existe imoveis cadastrados com a descrição: ${descricao}`,
            );
          }

          var imoveis = montarImovel(results);
          resolve(imoveis);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function excluirImovel(idImovel) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `delete from Imovel where IdImovel=${idImovel}`;

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          resolve(results);
        });
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
        'update Imovel set DescricaoImovel = ?, email = ?, LogradouroImovel = ?, Numero = ?, ' +
        'Complemento = ?, Bairro = ?, Cidade = ?, CEP = ?, UF = ?' +
        ' where IdImovel = ?';

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
  let imoveis = [];

  for (let i = 0; i < dado.rows.length; i++) {
    imoveis[i] = dado.rows.item(i);
  }

  return imoveis;
}
