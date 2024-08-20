const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const morgan = require('morgan')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex')({
    client: 'pg',
    connection:
    {
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB,
    },
});

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(morgan('combined'))


app.get('/', (req, res) => { res.send('success!!!') })

app.post('/signin', (req, res) => {signin.handleSignin(req, res, knex, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)} )

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)})
app.post('/profile/:id',  (req, res) => {profile.handleProfileUpdate(req, res, knex)})

app.put('/image', (req, res) => {image.handleImage(req, res, knex)})


app.listen(3000, () => {
    console.log("app running in port 3000")
})
