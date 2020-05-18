import {OpenDataBase} from './database.js';

export function CreateDataBaseService() {
  try {
    const db = OpenDataBase();

    const sqlCreateTableProduto =
      'CREATE TABLE IF NOT EXISTS Produto (' +
      ' IdProduto INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,' +
      ' NomeProduto VARCHAR(100) NOT NULL,' +
      ' CodigoProduto INTEGER NOT NULL,' +
      ' ValorProduto INTEGER NOT NULL);';
    const sqlCreateIndexProdutoCodigo =
      'CREATE UNIQUE INDEX IF NOT EXISTS [IX_CodigoProduto] ON [Produto] ([CodigoProduto]);';
    const sqlCreateIndexProdutoNome =
      'CREATE UNIQUE INDEX IF NOT EXISTS [IX_NomeProduto] ON [Produto] ([NomeProduto]);';
    db.transaction(function(txn) {
      txn.executeSql(sqlCreateTableProduto, []);
      txn.executeSql(sqlCreateIndexProdutoCodigo, []);
      txn.executeSql(sqlCreateIndexProdutoNome, []);
    });

    return '';
  } catch (err) {
    return err.message;
  }
}
