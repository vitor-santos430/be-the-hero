const express = require('express'); // importando o Express
const cors = require('cors');
const routes = require('./routes')
const { errors } = require('celebrate');

const app  = express(); // instancia da aplicação

app.use(cors());
app.use(express.json()); // Dizer para o express que estamos utilizando JSON
app.use(routes);
app.use(errors())

module.exports = app;

//app.listen(3333); //  diz que o app está ouvindo na porta 3333
// para executar o servidor 'node index.js'