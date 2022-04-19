const config = require('./config.json')
const mysql = require('mysql');

const express = require('express');
const bcrypt = require("bcrypt");

// async function connect() {
//     try {
//         return await mysql.createConnection({
//             host: config.rds_host,
//             user: config.rds_user,
//             password: config.rds_password,
//             port: config.rds_port,
//             database: config.project_db
//         });
//     } catch (err) {
//         console.log(err.message);
//         throw err;
//     }
// }


const connection = mysql.createConnection({
            host: config.rds_host,
            user: config.rds_user,
            password: config.rds_password,
            port: config.rds_port,
            database: config.project_db
        })

// connection.connect();

async function homePage(req, res){
    if (req.session.login){
        res.sendFile(__dirname + "/pages/homepage.html")
    }
    else {
        res.redirect("/login")
    }
}

async function loginPage(req, res){
    res.sendFile(__dirname + '/pages/login.html')
}

async function checkAuth(req, res, next){
    if (req.session.login){
        next();
    }
    else {
        // if not login, redirect to login page.
        res.redirect("/login")
    }

}

async function loginHandler(req, res) {
    const username = req.body.username
    const password = req.body.password
    if (username && password){
        const query = `SELECT userId, password FROM RegisteredUser
        WHERE nickname='${username}'`
        connection.query(query,
            function (error, results, fields){
            if (error) res.send(error);
            else {
                if (results.length > 0){
                    req.session.login = true;
                    req.session.username = username;
                    res.send("Logged in!");
                } else {
                    res.send("Invalid credential.");
                }
            }
            })
    } else {
        res.send("username and password are needed.")
    }
}

async function registerPage(req, res){
    res.sendFile(__dirname + "/pages/register.html")
}

async function registerHandler(req, res){
    const username = req.body.username
    const password = req.body.password
    if (username && password){
        const checkExistQuery = `SELECT userId, password FROM RegisteredUser
                                 WHERE nickname='${username}'`
        const insertQuery1 = `insert into User (userId) values ((select max(userid) + 1 from RegisteredUser));`
        const insertQuery2 = `insert into RegisteredUser (userId, password, nickname) values ((select max(userId) from User), 'password', '${username}');`
        connection.query(checkExistQuery,
            function (error, results, fields){
            if (error) res.send(error);
            else {
                if (results.length > 0){
                    res.send("Duplicate Name: " + username)
                } else {
                    try {
                        connection.query(insertQuery1,
                            function (error) {
                                if (error) res.send(error)
                                else {
                                    connection.query(insertQuery2,
                                        function (error) {
                                            if (error) res.send(error);
                                            else res.send("Register complete.");
                                        })
                                }
                            })
                    } catch (error){
                        res.send(error);
                    }

                }
            }
            })

    }
}

// ********************************************
//          ANIMATIONS RELATED ROUTE
// ********************************************
// animations/all route: return anime information with all grouped genres + producers
async function all_animations(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page;
        const pagesize = req.query.pagesize ? req.query.pagesize : 10;
        connection.query(`
            SELECT A2.animeId, A2.title, A2.age_rate, A2.aired, A2.type, A2.score, A2.img_url, AG.genres AS genre, AP.producers AS producer
            FROM 
                (SELECT A.animeID, GROUP_CONCAT(G.genreName ORDER BY G.genreName ASC SEPARATOR ', ') AS genres
                 FROM Anime A JOIN BelongTo B ON A.animeID= B.animeId 
                              JOIN Genre G ON B.genreId = G.genreId
                 GROUP BY A.animeID) AS AG, 
                 (SELECT A.animeID, GROUP_CONCAT(D.producerName ORDER BY D.producerName ASC SEPARATOR ', ') AS producers 
                 FROM Anime A JOIN Produces P ON A.animeID = P.animeID
                              JOIN Producer D ON P.producerId = D.producerId 
                 GROUP BY A.animeID) AS AP,
                 Anime A2 
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID
            ORDER BY A2.title, A2.score DESC
            LIMIT ${pagesize} OFFSET ${pagesize * (page - 1)};
        `, function (error, results, fields){
            if (error){
                console.log(error)
                res.json({ error: error })
            } else if (results){
                res.json({ results: results })
            }
        }
        )
    } else {
        connection.query(`
            SELECT A2.animeId, A2.title, A2.age_rate, A2.aired, A2.type, A2.score, A2.img_url, AG.genres AS genre, AP.producers AS producer
            FROM 
                (SELECT A.animeID, GROUP_CONCAT(G.genreName ORDER BY G.genreName ASC SEPARATOR ', ') AS genres
                 FROM Anime A JOIN BelongTo B ON A.animeID= B.animeId 
                              JOIN Genre G ON B.genreId = G.genreId
                 GROUP BY A.animeID) AS AG, 
                (SELECT A.animeID, GROUP_CONCAT(D.producerName ORDER BY D.producerName ASC SEPARATOR ', ') AS producers 
                 FROM Anime A JOIN Produces P ON A.animeID = P.animeID
                              JOIN Producer D ON P.producerId = D.producerId 
                 GROUP BY A.animeID) AS AP,
                Anime A2 
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID
            ORDER BY A2.title, A2.score DESC
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

async function all_animations_separate(req, res) {
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page;
        const pagesize = req.query.pagesize ? req.query.pagesize : 10;
        connection.query(`
            SELECT A.animeId, A.title, A.age_rate, A.aired, A.type, A.score, A.img_url, G.genreName AS genre, D.producerName AS producer 
            FROM Anime A JOIN BelongTo B ON A.animeID= B.animeId 
                         JOIN Genre G ON B.genreId = G.genreId
                         JOIN Produces P ON A.animeID = P.animeID
                         JOIN Producer D ON P.producerId = D.producerId 
            ORDER BY A.title, A.score DESC
            LIMIT ${pagesize} OFFSET ${pagesize * (page - 1)};
        `, function (error, results, fields){
            if (error){
                console.log(error)
                res.json({ error: error })
            } else if (results){
                res.json({ results: results })
            }
        }
        )
    } else {
        connection.query(`
            SELECT A.animeId, A.title, A.age_rate, A.aired, A.type, A.score, A.img_url, G.genreName AS genre, D.producerName AS producer 
            FROM Anime A JOIN BelongTo B ON A.animeID= B.animeId 
                         JOIN Genre G ON B.genreId = G.genreId
                         JOIN Produces P ON A.animeID = P.animeID
                         JOIN Producer D ON P.producerId = D.producerId 
            ORDER BY A.title, A.score DESC
        `, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

// ********************************************
//          ANIMATIO SPECIFIC ROUTE
// ********************************************

async function animation(req, res) {
    const animeid = req.query.id;
    if (animeid){
        console.log(animeid)
        connection.query(
            `
            SELECT A2.animeId, A2.title, A2.synopsis, A2.age_rate, A2.aired, A2.type, A2.score, A2.img_url, AG.genres AS genre, AP.producers AS producer
            FROM 
                (SELECT A.animeID, GROUP_CONCAT(G.genreName ORDER BY G.genreName ASC SEPARATOR ', ') AS genres
                 FROM Anime A JOIN BelongTo B ON A.animeID= B.animeId 
                              JOIN Genre G ON B.genreId = G.genreId
                 GROUP BY A.animeID) AS AG, 
                 (SELECT A.animeID, GROUP_CONCAT(D.producerName ORDER BY D.producerName ASC SEPARATOR ', ') AS producers 
                 FROM Anime A JOIN Produces P ON A.animeID = P.animeID
                              JOIN Producer D ON P.producerId = D.producerId 
                 GROUP BY A.animeID) AS AP,
                 Anime A2 
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND AG.animeID = ${animeid}
            `, function (error, results, field){
                if (error){
                    console.log(error)
                    res.json({ error: error })
                }
                else {
                    if (results){
                        res.json( {results: results})
                    }
                    else {
                        res.json({results: []})
                    }
                }
            }
        )
    }

    else {
        res.json({error: "id needed."})
    }

}

async function comments(req, res) {
    const animeid = req.query.id;
    if (animeid){
        console.log(animeid)
        connection.query(
            `
            SELECT A.animeId, RU.userId, RU.nickname, R.comments, R.rating 
            FROM Anime A JOIN ReviewedBy R ON A.animeId = R.animeId 
                         JOIN RegisteredUser RU ON R.userId = RU.userId 
            WHERE A.animeID = ${animeid} 
            `, function (error, results, field){
                if (error){
                    console.log(error)
                    res.json({ error: error })
                }
                else {
                    if (results){
                        res.json( {results: results})
                    }
                    else {
                        res.json({results: []})
                    }
                }
            }
        )
    }

    else {
        res.json({error: "id needed."})
    }

}


// ********************************************
//            HOMEWORK ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the FIFA server!`)
    } else {
        res.send(`Hello! Welcome to the FIFA server!`)
    }
}


// ********************************************
//                  WARM UP 
// ********************************************

// Route 2 (handler)
async function jersey(req, res) {
    const colors = ['red', 'blue']
    const jersey_number = Math.floor(Math.random() * 20) + 1
    const name = req.query.name ? req.query.name : "player"

    if (req.params.choice === 'number') {
        // TODO: TASK 1: inspect for issues and correct 
        res.json({ message: `Hello, ${name}!`, jersey_number: jersey_number })
    } else if (req.params.choice === 'color') {
        var lucky_color_index = Math.floor(Math.random() * 2);
        // TODO: TASK 2: change this or any variables above to return only 'red' or 'blue' at random (go Quakers!)
        res.json({ message: `Hello, ${name}!`, jersey_color: colors[lucky_color_index] })
    } else {
        // TODO: TASK 3: inspect for issues and correct
        res.json({ message: `Hello, ${name}, we like your jersey!` })
    }
}

// ********************************************
//               GENERAL ROUTES
// ********************************************


// Route 3 (handler)
async function all_matches(req, res) {
    // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
    // We have partially implemented this function for you to 
    // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
    // we didn't specify this default value for league, and you could change it if you want! 
    // in reality, league will never be undefined since URLs will need to match matches/:league for the request to be routed here... 
    const league = req.params.league ? req.params.league : 'D1'
    // use this league encoding in your query to furnish the correct results

    if (req.query.page && !isNaN(req.query.page)) {
        // This is the case where page is defined.
        // The SQL schema has the attribute OverallRating, but modify it to match spec! 
        // TODO: query and return results here:
        const page = req.query.page;
        const pagesize = req.query.pagesize ? req.query.pagesize : 10;
        connection.query(`
            SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
            FROM Matches 
            WHERE Division = '${league}'
            ORDER BY HomeTeam, AwayTeam
            LIMIT ${pagesize} OFFSET ${pagesize * (page - 1)};
        `, function (error, results, fields){
            if (error){
                console.log(error)
                res.json({ error: error })
            } else if (results){
                res.json({ results: results })
            }
        }

        )
   
    } else {
        // we have implemented this for you to see how to return results by querying the database
        connection.query(`
        SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
        FROM Matches 
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam
        `, function (error, results, fields) {

            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    }
}

// Route 4 (handler)
async function all_players(req, res) {
    // TODO: TASK 5: implement and test, potentially writing your own (ungraded) tests
    if (req.query.page && !isNaN(req.query.page)){
        const page = req.query.page;
        const pagesize = req.query.pagesize ? req.query.pagesize : 10;
        connection.query(
            `
            SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
            FROM Players
            ORDER BY Name
            LIMIT ${pagesize} OFFSET ${pagesize * (page - 1)};
            `, function (error, results, field){
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
            }
            }
        )
    }
    else {
        connection.query(
            `
            SELECT PlayerId, Name, Nationality, OverallRating as Rating, Potential, Club, Value
            FROM Players
            ORDER BY Name
            `, function (error, results, field){
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
            }
            }
        )
    }
    // return res.json({error: "Not implemented"})
}


// ********************************************
//             MATCH-SPECIFIC ROUTES
// ********************************************

// Route 5 (handler)
async function match(req, res) {
    // TODO: TASK 6: implement and test, potentially writing your own (ungraded) tests
    const id = req.query.id;
    if (id){
        connection.query(
            `
            SELECT MatchId, Date, Time, HomeTeam as Home, AwayTeam as Away, FullTimeGoalsH as HomeGoals, FullTimeGoalsA as AwayGoals,
            HalfTimeGoalsH as HTHomeGoals, HalfTimeGoalsA as HTAwayGoals, ShotsH as ShotsHome, ShotsA as ShotsAway, 
            ShotsOnTargetH as ShotsOnTargetHome, ShotsOnTargetA as ShotsOnTargetAway, FoulsH as FoulsHome, FoulsA as FoulsAway, 
            CornersH as CornersHome, CornersA as CornersAway, YellowCardsH as YCHome, YellowCardsA as YCAway, RedCardsH as RCHome, RedCardsA as RCAway
            FROM Matches
            WHERE MatchId=${id}
            `, function (error, results, field){
                if (error){
                    console.log(error)
                    res.json({ error: error })
                }
                else {
                    if (results){
                        Date = results.Date
                        res.json( {results: results})
                    }
                    else {
                        res.json({results: []})
                    }
                }
            }
        )
    }

    else {
        res.json({error: "id needed."})
    }

}

// ********************************************
//            PLAYER-SPECIFIC ROUTES
// ********************************************

// Route 6 (handler)
async function player(req, res) {
    // TODO: TASK 7: implement and test, potentially writing your own (ungraded) tests
    const id = req.query.id
    connection.query(
        `
        SELECT BestPosition
        FROM Players
        WHERE PlayerId='${id}'
        `, function (error, results, field) {
            if (results){
                if (results[0].BestPosition === "GK") {
                    connection.query(
                    `
                    SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating as Rating, Potential, Club, ClubLogo,
                    Value, Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil, Height, Weight, BestPosition,
                    BestOverallRating, ReleaseClause, GKPenalties, GKDiving, GKHandling, GKKicking, GKPositioning, GKReflexes
                    FROM Players
                    WHERE PlayerId=${id};
                    `, function (error, results, field){
                        if (error){
                            console.log(error)
                            res.json({error: error})
                        } else {
                            res.json({results: results})
                        }

                    }
                )
                }
                else {
                    connection.query(
                        `SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating as Rating, Potential, Club, ClubLogo,
                         Value, Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil, Height, Weight, BestPosition,
                         BestOverallRating, ReleaseClause, NPassing, NBallControl, NAdjustedAgility, NStamina, NStrength, NPositioning
                         FROM Players
                         WHERE PlayerId=${id};
                         `, function (error, results, field) {
                            res.json({results: results})
                        }
                    )
                }

            }
            else {
                res.json({results: []})
            }
        }
    )
}


// ********************************************
//             SEARCH ROUTES
// ********************************************

// Route 7 (handler)
async function search_matches(req, res) {
    // TODO: TASK 8: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    const Home = req.query.Home ? req.query.Home : ''
    const Away = req.query.Away ? req.query.Away : ''
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize :10
    if (page && !isNaN(page)) {
        connection.query(
            `
                SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away,
                FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
                FROM Matches
                WHERE HomeTeam LIKE '%${Home}%' AND AwayTeam LIKE '%${Away}%'
                ORDER BY HomeTeam, AwayTeam
                LIMIT ${pagesize} OFFSET ${pagesize * (page - 1)};
            `, function (error, results, field) {
                if (error) {
                    console.log(error)
                    res.json({error: error})
                } else {
                    if (results) {
                        res.json({results: results})
                    } else {
                        res.json({results: []})
                    }
                }
            }
        )
    }
    else {
        connection.query(
            `
                SELECT MatchId, Date, Time, HomeTeam As Home, AwayTeam AS Away,
                       FullTimeGoalsH as HomeGoals, FullTImeGoalsA as AwayGoals
                FROM Matches
                WHERE HomeTeam LIKE '%${Home}%'
                  AND AwayTeam LIKE '%${Away}%'
                ORDER BY HomeTeam, AwayTeam
            `, function (error, results, field) {
                if (error) {
                    console.log(error)
                    res.json({error: error})
                } else {
                    if (results) {
                        res.json({results: results})
                    } else {
                        res.json({results: []})
                    }
                }
            }
        )
    }


}

// Route 8 (handler)
async function search_players(req, res) {
    // TODO: TASK 9: implement and test, potentially writing your own (ungraded) tests
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string

    const Name = req.query.Name ? req.query.Name : ''
    const Nationality = req.query.Nationality ? req.query.Nationality : ''
    const Club = req.query.Club ? req.query.Club : ''
    const RatingL = req.query.RatingLow ? req.query.RatingLow : 0
    const RatingH = req.query.RatingHigh ? req.query.RatingHigh : 100
    const PotentialL = req.query.PotentialLow ? req.query.PotentialLow : 0
    const PotentialH = req.query.PotentialHigh ? req.query.PotentialHigh : 100
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize :10
    if (page && ! isNaN(page)) {
        connection.query(
            `
                SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
                FROM Players
                WHERE Name Like '%${Name}%'
                AND Nationality LIKE '%${Nationality}%'
                AND Club LIKE '%${Club}%'
                And OverallRating >= ${RatingL}
                AND OverallRating <= ${RatingH}
                AND Potential >= ${PotentialL}
                AND Potential <= ${PotentialH}
                ORDER BY NAME
                LIMIT ${pagesize} OFFSET ${pagesize * (page - 1)}
            `, function (error, results, field) {
                if (error) {
                    res.json({error: error})
                } else {
                    if (results) {
                        res.json({results: results})
                    } else {
                        res.json({results: []})
                    }
                }

            }
        )
    }
    else {
        connection.query(
            `
                SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
                FROM Players
                WHERE Name Like '%${Name}%'
                  AND Nationality LIKE '%${Nationality}%'
                  AND Club LIKE '%${Club}%'
                  And OverallRating >= ${RatingL}
                  AND OverallRating <= ${RatingH}
                  AND Potential >= ${PotentialL}
                  AND Potential <= ${PotentialH}
                  ORDER BY Name
            `, function (error, results, field) {
                if (error) {
                    res.json({error: error})
                } else {
                    if (results) {
                        res.json({results: results})
                    } else {
                        res.json({results: []})
                    }
                }

            }
        )
    }
}


module.exports = {
    hello,
    jersey,
    all_matches,
    all_players,
    match,
    player,
    search_matches,
    search_players,
    homePage,
    loginPage,
    loginHandler,
    checkAuth,
    registerPage,
    registerHandler,
    all_animations,
    all_animations_separate,
    animation,
    comments
}