const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/*
app.get('/', (request,response)=>{
    return response.send('Hello World'); // passando uma reposta para a rota raiz '/' que é enviar a mensagem 'Hello World'
}); // traçando a rota para raiz
*/

/**
 * Rota / Recurso
 */

/**
 * Métodos HTTP
 * GET: Buscar informações do backend
 * POST: Criar informações no backend
 * PUT: Alterar uma informação no backend
 * DELETE: Deletar uma informação no backend
 */

/**
 * TIPOS DE PARAMETROS:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após o simbolo de interrogação '?' (Filtros, paginação)
 * Route Params: Parâmetros utilizados para identificar recursos /users/:id (1)
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

 
// Login
routes.post('/sessions', SessionController.create);

// rota de listagem de Ongs no banco de dados
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}) ,OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) ,ProfileController.index);

// rota de listagem de casos das Ongs no banco de dados
routes.get('/incidents', celebrate({
    [Segments.QUERY]:Joi.object().keys({
        page: Joi.number(),
    }),
}) ,IncidentController.index);
routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}) ,IncidentController.delete);

//const params = request.query; // query params
//const params = request.params; // route params
//const params = request.body; // request body

module.exports = routes;