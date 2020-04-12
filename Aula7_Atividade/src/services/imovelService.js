import {OpenDataBase} from './database.js';

export function incluirImovel(imovel) {
  return new Promise((resolve, reject) => {
    try {
      var sql =
        'insert into Imovel (DescricaoImovel,Email,LogradouroImovel,Numero,Complemento,Bairro,Cidade,CEP,UF,IdUsuario,SituacaoImovel) ' +
        ' values (?, ?, ?, ?)';

      const db = OpenDataBase();
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          [
            imovel.descricaoImovel,
            imovel.email,
            imovel.logradouroImovel,
            imovel.numero,
            imovel.complemento,
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