//IMPORT PLUGIN
const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');
require('dotenv').config();

//CONSTANT
const app = express();

//IMPORT ROUTE
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//CONNECTION BASE DE DONNEES MONGOOSE
mongoose
  .connect(
    process.env.DB_DATA,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
  
// MIDDLEWARE CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
      );
      next();
    });

//MODIFIE LES EN-TETES HTTP LIE A LA SECURITE
app.use(helmet());

//MIDDLEWARE GLOBAL POUR RENDRE LES CORPS DE REQUETE EXPLOITABLE EN JSON
app.use(bodyParser.json());

//MIDDLEWARE POUR GERER LE DOSSIER IMAGES DE MANIERE STATIQUE
app.use('/images', express.static(path.join(__dirname, 'images')));

//ROUTES
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

//EXPORT
module.exports = app;