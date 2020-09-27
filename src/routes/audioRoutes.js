const { Router } = require("express");

//import { Router } from 'express';

// import all controllers
// import SessionController from './app/controllers/SessionController';
const  {getAudios, insertAudios} =require( '../controller/audiosController');

const routes = new Router();

// Add routes
 routes.get('/', getAudios);
 routes.post('/', insertAudios);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = routes;