const bodyParser = require('body-parser');

const express = require('express');

const sequelize = require('./util/database');

const authRoutes = require('./route/authRoutes');
const servicesRoutes = require('./route/servicesRoutes');
const worksRoutes = require("./route/worksRoutes");

const session = require('express-session');

const path = require('path');

app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(session({
    secret: "10052000",
    resave: false,
    saveUninitialized: false
}));

app.use(authRoutes);
app.use(servicesRoutes);
app.use(worksRoutes);

app.use('/', (req, res, next) => {
    res.redirect(404, '/Home');
})

sequelize
    .sync()
    // .sync({force : true})
    .then(() => {
        app.listen(3001);
    })
    .catch(err => {
        console.log(err);
    })
