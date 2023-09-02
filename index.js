const express = require('express');
const cors = require('cors');
const app = express();
// Swagger UI setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// //import db
// const connection=require('./connection');
//import route
const notesRoute= require('./routes/notes');
// Middleware setup

// add cors 
var corsOptions = {
    origin: 'https://localhost:5000'
}
app.use(cors(corsOptions));

// body barser
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//add url routes
app.use('/api',notesRoute);

// testing api
app.get('/', (req, res) => {
    res.json({ message: 'Hello, World !' });
  });

// Swagger UI route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;