import {OpenDataBase} from './database.js';
import Produto from '../model/produto';

let itens = [];

export function obterProdutos() {
  return new Promise((resolve, reject) => {
    try {
      const sql = 'select * from produto';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          if (results.rows.length === 0) {
            reject('Não existem produtos cadastrados.');
          }

          var produto = montarProdutos(results);

          resolve(produto);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function obterPorCodigo(codigo) {
  return new Promise((resolve, reject) => {
    try {
      const sql = 'select * from produto where codigoProduto="' + codigo + '"';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          if (results.rows.length === 0) {
            reject('Produto inexistente.');
          }

          var produto = montarProduto(results.rows.item(0));

          resolve(produto);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function obterPorNome(nome) {
  return new Promise((resolve, reject) => {
    try {
      const sql = 'select * from produto where nomeProduto="' + nome + '"';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(sql, [], (tx, results) => {
          if (results.rows.length === 0) {
            reject('Produto inexistente.');
          }

          var produto = montarProduto(results.rows.item(0));

          resolve(produto);
        });
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

export function obterLista() {
  return new Promise((resolve, reject) => {
    try {
      var lista = itens;
      resolve(lista);
    } catch (err) {
      reject(err.message);
    }
  });
}

export function limparLista() {
  return new Promise((resolve, reject) => {
    try {
      while (itens.length > 0) {
        itens.pop();
      }
      resolve(itens);
    } catch (err) {
      reject(err.message);
    }
  });
}

export function adicionarProdutoLista(lista) {
  return new Promise((resolve, reject) => {
    try {
      var itemAtual = montarLista(lista);
      resolve(itemAtual);
    } catch (err) {
      reject(err.message);
    }
  });
}

export function incluirProduto(produto) {
  return new Promise((resolve, reject) => {
    try {
      var sql =
        'insert into Produto (CodigoProduto,NomeProduto,ValorProduto) ' +
        ' values (?, ?, ?)';

      const db = OpenDataBase();
      db.transaction(tx => {
        tx.executeSql(
          sql,
          [produto.codigoProduto, produto.nomeProduto, produto.valorProduto],
          (tx, results) => {
            produto.idProduto = results.insertId;
            resolve(produto);
          },
        );
      });
    } catch (err) {
      reject(err.message);
    }
  });
}

function montarProdutos(dado) {
  let produtos = [];

  for (let i = 0; i < dado.rows.length; i++) {
    produtos[i] = dado.rows.item(i);
  }

  return produtos;
}

function montarLista(item) {
  itens = [...itens, item];
}

function montarProduto(dado) {
  var produto = new Produto();
  produto.idProduto = dado.IdProduto;
  produto.nomeProduto = dado.NomeProduto;
  produto.codigoProduto = dado.CodigoProduto;
  produto.valorProduto = dado.ValorProduto;
  return produto;
}