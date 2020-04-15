import {OpenDataBase} from './database.js';

export function CreateDataBaseService() {
  try {
    const db = OpenDataBase();

    const sqlCreateTableUser =
      'CREATE TABLE IF NOT EXISTS Usuario (' +
      ' IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,' +
      ' NomeUsuario VARCHAR(100) NOT NULL,' +
      ' IdeUsuario VARCHAR(50) NOT NULL,' +
      ' SenhaUsuario VARCHAR(200) NOT NULL,' +
      ' EMail varchar(200) not null );';
    const sqlCreateIndexUserIdeUsuario =
      'CREATE UNIQUE INDEX IF NOT EXISTS [IX_IdeUsuario] ON [Usuario] ([IdeUsuario]);';
    const sqlCreateIndexUserEmail =
      'CREATE UNIQUE INDEX IF NOT EXISTS [IX_Email] ON [Usuario] ([EMail]);';
    const sqlCreateTableImovel =
      'CREATE TABLE IF NOT EXISTS Imovel (' +
      ' IdImovel INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,' +
      ' DescricaoImovel VARCHAR(200) NOT NULL,' +
      ' Email VARCHAR(200) NOT NULL,' +
      ' LogradouroImovel VARCHAR(200) NOT NULL,' +
      ' Numero INTEGER NOT NULL,' +
      ' Complemento VARCHAR(30),' +
      ' Bairro VARCHAR(50) NOT NULL,' +
      ' CEP INTEGER NOT NULL,' +
      ' UF VARCHAR(2) NOT NULL,' +
      ' IdUsuario INTEGER NOT NULL,' +
      ' SituacaoImovel VARCHAR(1) NOT NULL,' +
      ' FOREIGN KEY(IdUsuario) REFERENCES Usuario(IdUsuario));';
    db.transaction(function(txn) {
      txn.executeSql(sqlCreateTableUser, []);
      txn.executeSql(sqlCreateIndexUserIdeUsuario, []);
      txn.executeSql(sqlCreateIndexUserEmail, []);
      txn.executeSql(sqlCreateTableImovel, []);
    });

    return '';
  } catch (err) {
    return err.message;
  }
}
