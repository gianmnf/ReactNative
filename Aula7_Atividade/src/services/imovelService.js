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

          var imovel = montarImoveis(results);

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
        'update Imovel set DescricaoImovel = ?, Email = ?, LogradouroImovel = ?, Numero = ?, Complemento = ?, Bairro = ?, Cidade = ?, CEP = ?, UF = ?, IdUsuario = ?, SituacaoImovel = ? ' +
        ' where idImovel = ?';

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

export function deletarImovel(idImovel) {
  return new Promise((resolve, reject) => {
    try {
      var sql = 'delete from imovel where IdImovel=' + idImovel;
      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          resolve(idImovel);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function obterPorDescricao(descricao) {
  return new Promise((resolve, reject) => {
    try {
      const sql =
        'select * from imovel where DescricaoImovel="' + descricao + '"';

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

export function obterPesquisa(descricao) {
  console.tron.log('Cheguei na pesquisa ' + descricao);
  return new Promise((resolve, reject) => {
    try {
      const sql =
        'select * from imovel where DescricaoImovel like "%' + descricao + '%"';
      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          console.tron.log(results);
          if (results.rows.length === 0) {
            reject('Imóvel inexistente');
          }

          var imovel = montarImoveis(results);

          resolve(imovel);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

function montarImoveis(dado) {
  let imoveis = [];

  for (let i = 0; i < dado.rows.length; i++) {
    imoveis[i] = dado.rows.item(i);
    console.tron.log('Imóvel[' + i + ']: ' + imoveis[i]);
  }

  return imoveis;
}

function montarImovel(dado) {
  var imovel = new Imovel();
  imovel.descricaoImovel = dado.DescricaoImovel;
  imovel.email = dado.Email;
  imovel.logradouroImovel = dado.LogradouroImovel;
  imovel.numero = dado.Numero;
  imovel.complemento = dado.Complemento;
  imovel.bairro = dado.Bairro;
  imovel.cidade = dado.Cidade;
  imovel.cep = dado.CEP;
  imovel.uf = dado.UF;
  imovel.idUsuario = dado.IdUsuario;
  imovel.situacaoImovel = dado.SituacaoImovel;
  return imovel;
}
