// server.js
require('dotenv').config({ path: 'variables.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes.js');

const server = express();

// Configuração do CORS
server.use(cors());

// Configuração do body-parser para dados codificados em URL e JSON
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Roteamento
server.use('/api', routes);

// Configuração do Servidor
server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});

// Middleware para logs de requisições
server.use((req, res, next) => {
    console.log(`Recebida uma requisição para: ${req.method} ${req.url}`);
    console.log('Corpo da Requisição:', req.body);
    next();
});
