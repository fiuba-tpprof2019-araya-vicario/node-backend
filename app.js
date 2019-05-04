const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();

const sequelize = new Sequelize("postgres://postgres:postgres@database:5432/postgres");
sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch(err => console.error('Unable to connect to the database:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

const handleCorsHeaders = function (req, res, next) {
  if (req.get("Origin") != null)
  {
    res.header('Access-Control-Allow-Origin', req.get('Origin'));
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.get('Access-Control-Request-Method')) {
        res.header('Access-Control-Allow-Methods', req.get('Access-Control-Request-Method'));
    }
    if (req.get('Access-Control-Request-Headers')) {
        res.header('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers'));
    }
    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {
        next()
    }
  } else {
      next()
  }
};

app.use(handleCorsHeaders);

function getPort(){
	return process.env.PORT || 3000;
}

const port = getPort();

app.listen(port)

module.exports = app;