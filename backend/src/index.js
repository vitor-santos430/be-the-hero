const express = require('express'); // importando o Express

const cors = require('cors');

const routes = require('./routes')

const app  = express(); // instancia da aplicação

app.use(cors());
app.use(express.json()); // Dizer para o express que estamos utilizando JSON
app.use(routes);

app.listen(3333); //  diz que o app está ouvindo na porta 3333
// para executar o servidor 'node index.js'