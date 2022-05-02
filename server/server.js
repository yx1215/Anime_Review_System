const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')
const session = require("express-session");

const app = express();

app.use(express.urlencoded({
  extended: true
}))

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// homework routes
// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));


app.post('/login', routes.loginHandler);

app.get('/', routes.checkAuth, routes.homePage);

app.get('/login', routes.loginPage);

app.get('/register', routes.registerPage);

app.post('/register', routes.registerHandler);

app.get('/animations/all', routes.all_animations);

app.get('/animations/separate', routes.all_animations_separate);

app.get('/animation', routes.animation);

app.get('/comments', routes.comments);

app.get('/search/animations', routes.search_animations);

// homework routes
// Route 1 - register as GET 
// app.get('/hello', routes.hello)
//
// // Route 2 - register as GET
// app.get('/jersey/:choice', routes.jersey)
//
// // Route 3 - register as GET
// app.get('/matches/:league', routes.all_matches)
//
// // Route 4 - register as GET
// app.get('/players', routes.all_players)
//
// // Route 5 - register as GET
// app.get('/match', routes.match)
//
// // Route 6 - register as GET
// app.get('/player', routes.player)
//
// // Route 7 - register as GET
// app.get('/search/matches', routes.search_matches)
//
// // Route 8 - register as GET
// app.get('/search/players', routes.search_players)

app.get('/users', routes.all_user);

app.get("/logout", routes.logout);




app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
