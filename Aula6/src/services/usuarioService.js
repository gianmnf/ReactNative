import {OpenDataBase} from './database.js';
import Usuario from '../model/usuario';

export function obterPorIdeUsuario(ideUsuario) {
  return new Promise((resolve, reject) => {
    try {
      const sql =
        'select * from usuario where lower(ideusuario)="' +
        ideUsuario.toLowerCase() +
        '"';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          if (results.rows.length === 0) {
            reject('Usuário inexistente');
          }

          var usuario = montarUsuario(results.rows.item(0));

          resolve(usuario);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function incluirUsuario(usuario) {
  return new Promise((resolve, reject) => {
    try {
      var sql =
        'insert into Usuario (NomeUsuario, IdeUsuario, SenhaUsuario, Email) ' +
        ' values (?, ?, ?, ?)';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(
          sql,
          [
            usuario.nomeUsuario,
            usuario.ideUsuario,
            usuario.senhaUsuario,
            usuario.email,
          ],
          (tx, results) => {
            usuario.idUsuario = results.insertId;
            resolve(usuario);
          },
        );
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function obterPorEmail(email) {
  return new Promise((resolve, reject) => {
    try {
      const sql =
        'select * from usuario where lower(email)="' +
        email.toLowerCase() +
        '"';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          if (results.rows.length === 0) {
            reject('Usuário inexistente');
          }

          var usuario = montarUsuario(results.rows.item(0));

          resolve(usuario);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

function montarUsuario(dado) {
  var usuario = new Usuario();
  usuario.idUsuario = dado.IdUsuario;
  usuario.nomeUsuario = dado.NomeUsuario;
  usuario.email = dado.EMail;
  usuario.senhaUsuario = dado.SenhaUsuario;
  usuario.ideUsuario = dado.IdeUsuario;
  return usuario;
}
