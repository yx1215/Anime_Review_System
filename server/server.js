const express = require('express');
const mysql = require('mysql');
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

app.get('/animations/sort_score', routes.animations_sort_rating)

app.get('/animations/sort_aired', routes.animations_sort_aired)

app.get('/animations/sort_most_viewed', routes.animations_sort_most_viewed)

//app.get('/animations/producer_score', routes.animations_sort_producer_popularity)

//app.get('/animations/producer_aired', routes.animations_sort_producer_aired)

app.get('/comments/user', routes.find_comments_for_user);

app.get('/comments/anime', routes.find_comments_for_anime);

app.post("/comments/anime", routes.make_comments);

app.get('/search/animations', routes.search_animations);

app.get('/all_users', routes.all_user);

app.get('/search/users', routes.search_users);

app.get('/search/single_user', routes.find_single_user)

app.get('/users', routes.all_user);

app.get("/logout", routes.logout);

app.get("/recommend_friends", routes.friend_recommendation);

app.get("/user/fav_genres", routes.user_favourite_genre);

app.get("/anime/avg", routes.get_avg_score)
app.listen(config.server_port, () => {
	console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;