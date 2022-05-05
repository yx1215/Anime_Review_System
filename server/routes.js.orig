const config = require('./config.json')
const mysql = require('mysql');

const express = require('express');
const bcrypt = require("bcrypt");


const connection = mysql.createConnection({
            host: config.rds_host,
            user: config.rds_user,
            password: config.rds_password,
            port: config.rds_port,
            database: config.project_db
        })

connection.connect();
// ********************************************
//            Authentication
// ********************************************

async function homePage(req, res){
    if (req.session.login){
        const userId = req.session.userId
        const query =
            `
            SELECT * FROM RegisteredUser
            WHERE userId='${userId}'
            `
        connection.query(query, function (error, results, fields)
        {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        })
        // res.sendFile(__dirname + "/pages/homepage.html")
    }
    else {
        res.redirect("/login")
    }
}

async function loginPage(req, res){
    res.sendFile(__dirname + '/pages/login.html')
}

async function checkAuth(req, res, next){
    console.log(req.session);
    if (req.session.login){
        console.log("enter");
        next();
    }
    else {
        // if not login, redirect to login page.
        res.send("please log in first!");
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
                    req.session.userId = results[0].userId;
                    res.send("log in successfully!");
                } else {
                    res.send("Invalid credential.");
                }
            }
            })
    } else {
        res.send("username and password are needed.")
    }
}

async function logout(req, res){
    req.session.login = false
    req.session.userId = null
    res.redirect("/login")
}

async function registerPage(req, res){
    res.sendFile(__dirname + "/pages/register.html")
}

async function registerHandler(req, res){
    console.log("enter: "+JSON.stringify(req.body));

    const username = req.body.username
    const password = req.body.password
    console.log("username: "+username);
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
            SELECT DISTINCT A.animeId, RU.userId, RU.nickname, R.comments, R.rating 
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

async function search_animations(req, res) {
    const title = req.query.Title ? req.query.Title : ''
    const synopsis = req.query.Synopsis ? req.query.Synopsis : ''
    const genre = req.query.Genre ? req.query.Genre : ''
    const producer = req.query.Producer ? req.query.Producer: ''
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize :10
    console.log(title)
    if (page && !isNaN(page)) {
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
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND 
                  A2.title LIKE '%${title}%' AND A2.synopsis LIKE '%${synopsis}%' AND 
                  AG.genres LIKE '%${genre}%' AND AP.producers LIKE '%${producer}%'
            ORDER BY A2.score DESC, A2.title
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
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND 
                  A2.title LIKE '%${title}%' AND A2.synopsis LIKE '%${synopsis}%' AND 
                  AG.genres LIKE '%${genre}%' AND AP.producers LIKE '%${producer}%'
            ORDER BY A2.score DESC, A2.title;
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

async function animations_sort_genre_popularity(req, res) {
    const genre = req.query.Genre ? req.query.Genre : ''
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize :10
    if (page && !isNaN(page)) {
        connection.query(
            `
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
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND 
                  AG.genres LIKE '%${genre}%'
            ORDER BY A2.score DESC, A2.title
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
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND 
                  AG.genres LIKE '%${genre}%'
            ORDER BY A2.score DESC, A2.title
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

async function animations_sort_genre_aired(req, res) {
    const genre = req.query.Genre ? req.query.Genre : ''
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize :10
    if (page && !isNaN(page)) {
        connection.query(
            `
            SELECT A2.animeId, A2.title, A2.age_rate, 
                   STR_TO_DATE(REPLACE(SUBSTRING(REPLACE(A2.aired, '  ', ' '), 1, 12), ' ', ''), '%b%d,%Y') AS aired, 
                   A2.type, A2.score, A2.img_url, AG.genres AS genre, AP.producers AS producer
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
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND 
                  AG.genres LIKE '%${genre}%'
            ORDER BY aired DESC, A2.title
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
            SELECT A2.animeId, A2.title, A2.age_rate, 
                   STR_TO_DATE(REPLACE(SUBSTRING(REPLACE(A2.aired, '  ', ' '), 1, 12), ' ', ''), '%b%d,%Y') AS aired, 
                   A2.type, A2.score, A2.img_url, AG.genres AS genre, AP.producers AS producer
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
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND 
                  AG.genres LIKE '%${genre}%'
            ORDER BY aired DESC, A2.title
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

async function animations_sort_producer_popularity(req, res) {
    const producer = req.query.Producer ? req.query.Producer : ''
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize :10
    if (page && !isNaN(page)) {
        connection.query(
            `
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
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND 
                  AP.producers LIKE '%${producer}%' and AP.producers != 'Unknown'
            ORDER BY A2.score DESC, A2.title
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
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND 
                  AP.producers LIKE '%${producer}%'
            ORDER BY A2.score DESC, A2.title
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

async function animations_sort_producer_aired(req, res) {
    const producer = req.query.Producer ? req.query.Producer : ''
    const page = req.query.page
    const pagesize = req.query.pagesize ? req.query.pagesize :10
    if (page && !isNaN(page)) {
        connection.query(
            `
            SELECT A2.animeId, A2.title, A2.age_rate, 
                   STR_TO_DATE(REPLACE(SUBSTRING(REPLACE(A2.aired, '  ', ' '), 1, 12), ' ', ''), '%b%d,%Y') AS aired, 
                   A2.type, A2.score, A2.img_url, AG.genres AS genre, AP.producers AS producer
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
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND 
                  AP.producers LIKE '%${producer}%'
            ORDER BY aired DESC, A2.title
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
            SELECT A2.animeId, A2.title, A2.age_rate, 
                   STR_TO_DATE(REPLACE(SUBSTRING(REPLACE(A2.aired, '  ', ' '), 1, 12), ' ', ''), '%b%d,%Y') AS aired, 
                   A2.type, A2.score, A2.img_url, AG.genres AS genre, AP.producers AS producer
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
            WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND 
                  AP.producers LIKE '%${producer}%'
            ORDER BY aired DESC, A2.title
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



// ********************************************
//               GENERAL ROUTES
// ********************************************

async function all_user(req, res){
    let query;
    if (req.query.page && !isNaN(req.query.page)){
        const page = req.query.page;
        const pagesize = req.query.pagesize ? req.query.pagesize : 10;
        query = `
            WITH PartialLike AS (
                SELECT * FROM(
                        SELECT likeAnime.userId as userId, A2.animeId as animeId, A2.title as title, A2.img_url as img_url,  row_number() over (partition by likeAnime.userId order by A2.score DESC) AS animeRank
                        FROM likeAnime JOIN Anime A2 on A2.animeId = likeAnime.animeId
                        ) as l
                WHERE l.animeRank <= 5
            ),
            UserLike AS (
                SELECT RU.nickname, RU.age, RU.gender,
                       GROUP_CONCAT(PL.title ORDER BY PL.animeRank ASC SEPARATOR ', ') AS likeAnime,
                       GROUP_CONCAT(PL.img_url ORDER BY PL.animeRank ASC SEPARATOR ', ') AS likeAnimeImg
                FROM RegisteredUser RU LEFT JOIN PartialLike PL on RU.userId=PL.userId
                GROUP BY RU.userId
            )
            SELECT * FROM UserLike
            LIMIT ${pagesize} OFFSET ${pagesize * (page - 1)};
            `
    }
    else {
        query = `
            WITH PartialLike AS (
                SELECT * FROM(
                        SELECT likeAnime.userId as userId, A2.animeId as animeId, A2.title as title, A2.img_url as img_url,  row_number() over (partition by likeAnime.userId order by A2.score DESC) AS animeRank
                        FROM likeAnime JOIN Anime A2 on A2.animeId = likeAnime.animeId
                        ) as l
                WHERE l.animeRank <= 5
            ),
            UserLike AS (
                SELECT RU.nickname, RU.age, RU.gender,
                       GROUP_CONCAT(PL.title ORDER BY PL.animeRank ASC SEPARATOR ', ') AS likeAnime,
                       GROUP_CONCAT(PL.img_url ORDER BY PL.animeRank ASC SEPARATOR ', ') AS likeAnimeImg
                FROM RegisteredUser RU LEFT JOIN PartialLike PL on RU.userId=PL.userId
                GROUP BY RU.userId
            )
            SELECT * FROM UserLike;
            `
    }
    connection.query(query,
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        }
    )
}

async function search_users(req, res){
    const nickname = req.query.nickname
    let query;
    if (req.query.page && !isNaN(req.query.page)){
        const page = req.query.page;
        const pagesize = req.query.pagesize ? req.query.pagesize : 10;
        query = `
            WITH PartialLike AS (
                SELECT * FROM(
                        SELECT likeAnime.userId as userId, A2.animeId as animeId, A2.title as title, A2.img_url as img_url,  row_number() over (partition by likeAnime.userId order by A2.score DESC) AS animeRank
                        FROM likeAnime JOIN Anime A2 on A2.animeId = likeAnime.animeId
                        ) as l
                WHERE l.animeRank <= 5
            ),
            UserLike AS (
                SELECT RU.nickname, RU.age, RU.gender,
                       GROUP_CONCAT(PL.title ORDER BY PL.animeRank ASC SEPARATOR ', ') AS likeAnime,
                       GROUP_CONCAT(PL.img_url ORDER BY PL.animeRank ASC SEPARATOR ', ') AS likeAnimeImg
                FROM RegisteredUser RU LEFT JOIN PartialLike PL on RU.userId=PL.userId
                GROUP BY RU.userId
            )
            SELECT * FROM UserLike
            LIMIT ${pagesize} OFFSET ${pagesize * (page - 1)};
            `
    }
    else {
        query = `
            WITH PartialLike AS (
                SELECT * FROM(
                        SELECT likeAnime.userId as userId, A2.animeId as animeId, A2.title as title, A2.img_url as img_url,  row_number() over (partition by likeAnime.userId order by A2.score DESC) AS animeRank
                        FROM likeAnime JOIN Anime A2 on A2.animeId = likeAnime.animeId
                        ) as l
                WHERE l.animeRank <= 5
            ),
            UserLike AS (
                SELECT RU.nickname, RU.age, RU.gender,
                       GROUP_CONCAT(PL.title ORDER BY PL.animeRank ASC SEPARATOR ', ') AS likeAnime,
                       GROUP_CONCAT(PL.img_url ORDER BY PL.animeRank ASC SEPARATOR ', ') AS likeAnimeImg
                FROM RegisteredUser RU LEFT JOIN PartialLike PL on RU.userId=PL.userId
                GROUP BY RU.userId
            )
            SELECT * FROM UserLike WHERE nickname LIKE '%${nickname}%';
            `
    }
    connection.query(query,
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        }
    )
}

async function find_single_user(req, res){
    const userId = req.query.userId
    let query = `
    WITH PartialLike AS (
                SELECT * FROM(
                        SELECT likeAnime.userId as userId, A2.animeId as animeId, A2.title as title, A2.img_url as img_url,  row_number() over (partition by likeAnime.userId order by A2.score DESC) AS animeRank
                        FROM likeAnime JOIN Anime A2 on A2.animeId = likeAnime.animeId
                        ) as l
                WHERE l.animeRank <= 5
            ),
            UserLike AS (
                SELECT RU.userId, RU.nickname, RU.age, RU.gender,
                       GROUP_CONCAT(PL.title ORDER BY PL.animeRank ASC SEPARATOR ', ') AS likeAnime,
                       GROUP_CONCAT(PL.img_url ORDER BY PL.animeRank ASC SEPARATOR ', ') AS likeAnimeImg
                FROM RegisteredUser RU LEFT JOIN PartialLike PL on RU.userId=PL.userId
                GROUP BY RU.userId
            )
            SELECT * FROM UserLike NATURAL JOIN ReviewedBy WHERE userId=${userId};
    `
    connection.query(query,
        function(error, results, fields){
            if (error){
                console.log(error)
                res.json({error: error})
            } else {
                res.json({results: results})
            }
        }

        )
}


module.exports = {
    homePage,
    loginPage,
    loginHandler,
    logout,
    checkAuth,
    registerPage,
    registerHandler,
    all_animations,
    all_animations_separate,
    animation,
    comments,
    search_animations,
<<<<<<< HEAD
    all_user
=======
    all_user,
    search_users,
    find_single_user,
    animations_sort_genre_popularity,
    animations_sort_genre_aired,
    animations_sort_producer_popularity,
    animations_sort_producer_aired
>>>>>>> b262488638d4fed41fdad2be1ab57f2f62eeae77
}
