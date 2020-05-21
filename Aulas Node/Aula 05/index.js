const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const databaseConfig = require("./src/config/dataBase");

mongoose.connect(databaseConfig.uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro na Ligação ao MongoDB"));

const routes = require('./src/routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

let porta = 5006;
app.listen(porta, () => {
    console.log("Servidor em execução na porta " + porta);
});