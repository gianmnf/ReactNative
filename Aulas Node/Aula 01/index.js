const express = require('express');
const routes = require('./src/routes/index');

const app = express();
app.use(routes);

let porta = 5006;
app.listen(porta, () => {
    console.log("Servidor em execução na porta = " + porta);
});