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

async function homePage(req, res) {
    if (req.session.login) {
        const userId = req.session.userId
        const query =
            `
            SELECT * FROM RegisteredUser
            WHERE userId='${userId}'
            `
        connection.query(query, function (error, results, fields) {
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

async function loginPage(req, res) {
    res.sendFile(__dirname + '/pages/login.html')
}

async function checkAuth(req, res, next) {
    console.log(req.session);
    if (req.session.login) {
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
    if (username && password) {
        const query = `SELECT userId, password FROM RegisteredUser
        WHERE nickname='${username}'`
        connection.query(query,
            async function (error, results, fields) {
                if (error) res.send(error);
                else {
                    if (results.length > 0) {
                        const pwdHash = results[0].password
                        const validPassword = await bcrypt.compare(password, pwdHash);
                        if (validPassword){
                            req.session.login = true;
                            req.session.userId = results[0].userId;
                            res.json({message: "log in successfully!", results: results});
                        } else {
                            res.json({message: "Invalid password for username: " + username});
                        }

                    } else {
                        res.json({message: `Username ${username} does not exist.`});
                    }
                }
            })
    } else {
        res.send("username and password are needed.")
    }
}

async function logout(req, res) {
    req.session.login = false
    req.session.userId = null
    res.redirect("/login")
}

async function registerPage(req, res) {
    res.sendFile(__dirname + "/pages/register.html")
}

async function registerHandler(req, res) {
    console.log("enter: " + JSON.stringify(req.body));

    const username = req.body.username
    const password = req.body.password
    const salt = await bcrypt.genSalt(10);
    const pwdHash = await bcrypt.hash(password, salt);
    console.log("username: " + username);
    if (username && password) {
        const checkExistQuery = `SELECT userId, password FROM RegisteredUser
                                 WHERE nickname='${username}'`
        const insertQuery1 = `insert into User (userId) values ((select max(userid) + 1 from RegisteredUser));`
        const insertQuery2 = `insert into RegisteredUser (userId, password, nickname) values ((select max(userId) from User), '${pwdHash}', '${username}');`
        connection.query(checkExistQuery,
            function (error, results, fields) {
                if (error) res.send(error);
                else {
                    if (results.length > 0) {
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
                        } catch (error) {
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
        WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND A2.title != 'Unknown'
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

async function all_animations_separate(req, res) {
    connection.query(`
        SELECT A.animeId, A.title, A.age_rate, A.aired, A.type, A.score, A.img_url, G.genreName AS genre, D.producerName AS producer
        FROM Anime A JOIN BelongTo B ON A.animeID= B.animeId
                     JOIN Genre G ON B.genreId = G.genreId
                     JOIN Produces P ON A.animeID = P.animeID
                     JOIN Producer D ON P.producerId = D.producerId
        WHERE A.title != 'Unknown'
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

// ********************************************
//          ANIMATIO SPECIFIC ROUTE
// ********************************************

async function animation(req, res) {
    const animeid = req.query.id;
    if (animeid) {
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
            `, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else {
                if (results) {
                    res.json({ results: results })
                }
            }
        })
    }

    else {
        res.json({ error: "id needed." })
    }

}

async function find_comments_for_anime(req, res) {
    const animeid = req.query.animeid;
    if (animeid) {
        console.log(animeid)
        connection.query(
            `
            SELECT A.animeId, RU.userId, RU.nickname, R.comments, R.rating, RU.gender
            FROM Anime A JOIN ReviewedBy R ON A.animeId = R.animeId
                         JOIN RegisteredUser RU ON R.userId = RU.userId
            WHERE A.animeID = ${animeid}
            `, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            }
            else {
                if (results) {
                    res.json({ results: results })
                }
                else {
                    res.json({ results: [] })
                }
            }
        }
        )
    }

    else {
        res.json({ error: "id needed." })
    }

}

async function find_comments_for_user(req, res) {
    const userId = req.query.userId;
    if (userId) {
        console.log(userId)
        connection.query(
            `
            SELECT A.animeId, A.title, RU.userId, RU.nickname, R.comments, R.rating
            FROM Anime A JOIN ReviewedBy R ON A.animeId = R.animeId
                         JOIN RegisteredUser RU ON R.userId = RU.userId
            WHERE RU.userId = ${userId}
            `, function (error, results, field) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            }
            else {
                if (results) {
                    res.json({ results: results })
                }
                else {
                    res.json({ results: [] })
                }
            }
        }
        )
    }

    else {
        res.json({ error: "id needed." })
    }

}

async function search_animations(req, res) {
    const title = req.query.Title ? req.query.Title : ''
    const synopsis = req.query.Synopsis ? req.query.Synopsis : ''
    const genre = req.query.Genre ? req.query.Genre : ''
    const producer = req.query.Producer ? req.query.Producer : ''
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
              AND A2.title != 'Unknown'
        ORDER BY A2.score DESC, A2.title;
        `, function (error, results, field) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else {
            if (results) {
                res.json({ results: results })
            } else {
                res.json({ results: [] })
            }
        }
    }
    )
}

async function animations_sort_rating(req, res) {
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
        WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND A2.title != 'Unknown'
        ORDER BY A2.score DESC, A2.title
        `, function (error, results, field) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else {
            if (results) {
                res.json({ results: results })
            } else {
                res.json({ results: [] })
            }
        }
    }
    )
}

async function animations_sort_aired(req, res) {
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
        WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND A2.title != 'Unknown'
        ORDER BY aired DESC, A2.title
        `, function (error, results, field) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else {
            if (results) {
                res.json({ results: results })
            } else {
                res.json({ results: [] })
            }
        }
    }
    )
}

async function animations_sort_most_viewed(req, res) {

    connection.query(
        `
        SELECT A2.animeId, A2.aired, A2.title, A2.age_rate, A2.type, A2.score, A2.img_url,
               V.num_viewers, AG.genres AS genre, AP.producers AS producer
        FROM
            (SELECT A.animeId, COUNT(*) AS num_viewers
             FROM Anime A JOIN Watched W ON A.animeId = W.animeID
                          JOIN User U on W.userid = U.userId
             GROUP BY A.animeId) AS V,
            (SELECT A.animeID, GROUP_CONCAT(G.genreName ORDER BY G.genreName ASC SEPARATOR ', ') AS genres
             FROM Anime A JOIN BelongTo B ON A.animeID= B.animeId
                          JOIN Genre G ON B.genreId = G.genreId
             GROUP BY A.animeID) AS AG,
            (SELECT A.animeID, GROUP_CONCAT(D.producerName ORDER BY D.producerName ASC SEPARATOR ', ') AS producers
             FROM Anime A JOIN Produces P ON A.animeID = P.animeID
                          JOIN Producer D ON P.producerId = D.producerId
             GROUP BY A.animeID) AS AP,
            Anime A2
        WHERE AG.animeID = AP.animeID AND A2.animeID = AG.animeID AND V.animeId = A2.animeId AND A2.title != 'Unknown'
        ORDER BY V.num_viewers DESC, A2.title;
        `, function (error, results, field) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else {
            if (results) {
                res.json({ results: results })
            } else {
                res.json({ results: [] })
            }
        }
    }
    )

}

async function animations_sort_producer_aired(req, res) {
    const producer = req.query.Producer ? req.query.Producer : ''
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
                res.json({ error: error })
            } else {
                if (results) {
                    res.json({ results: results })
                } else {
                    res.json({ results: [] })
                }
            }
        })
}


// ********************************************
//               GENERAL ROUTES
// ********************************************

async function all_user(req, res) {
    let query = `
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

async function search_users(req, res) {
    const nickname = req.query.nickname
    let query;
    query = `
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
        SELECT * FROM UserLike WHERE nickname LIKE '%${nickname}%';
        `
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

async function find_single_user(req, res) {
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
            SELECT * FROM UserLike WHERE userId=${userId};
    `
    connection.query(query,
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else {
                res.json({ results: results })
            }
        }

    )
}

async function friend_recommendation(req, res) {
    const userId = req.query.userId;
    let query = `
    WITH ONE_CONNECT_TOTAL AS (
       SELECT LA1.userId AS ID1,
              LA2.userId AS ID2
       FROM likeAnime LA1 JOIN likeAnime LA2 on LA1.animeId = LA2.animeId
       WHERE LA1.userId <> LA2.userId
   ),
   ONE_CONNECT AS (
       SELECT * FROM ONE_CONNECT_TOTAL WHERE ID1 = '${userId}'
   ),
   TWO_CONNECT AS (
       SELECT DISTINCT OC1.ID1 AS ID1, OC2.ID2 AS ID2
       FROM ONE_CONNECT OC1 JOIN ONE_CONNECT_TOTAL OC2 ON OC1.ID2=OC2.ID1
       WHERE OC1.ID1 <> OC2.ID2 AND (OC2.ID2 NOT IN (SELECT ID2 FROM ONE_CONNECT)) LIMIT 3
   )
    (SELECT RegisteredUser.nickname AS nickname, RegisteredUser.gender AS gender, ID2 AS ID, 1 AS n FROM ONE_CONNECT JOIN RegisteredUser ON ONE_CONNECT.ID2=RegisteredUser.userId LIMIT 3)
    UNION
    (SELECT RegisteredUser.nickname AS nickname, RegisteredUser.gender AS gender, ID2 AS ID, 2 AS n FROM TWO_CONNECT JOIN RegisteredUser ON TWO_CONNECT.ID2=RegisteredUser.userId)
    `
    connection.query(query,
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else {
                res.json({ results: results })
            }
        })
}

async function user_favourite_genre(req, res){
    const userId = req.query.userId;
    let query = `
    WITH TEMP_GENRE AS (
        SELECT R.userId, G.genreId, COUNT(G.genreId) AS num_genres
        FROM RegisteredUser R JOIN Watched W on R.userId = W.userid
                              JOIN Anime A on W.animeID = A.animeId
                              JOIN BelongTo B ON A.animeId = B.animeId
                              JOIN Genre G ON B.genreId = G.genreId
        GROUP BY  R.userId, G.genreId
        ORDER BY  R.userId
    ),
        user_favorite_genre AS(
            SELECT T.userId, R.age, T.genreId, G.genreName, T.num_genres, row_number() over (PARTITION BY T.userId ORDER BY T.num_genres DESC) AS rank_genres
            FROM TEMP_GENRE T JOIN Genre G ON T.genreId = G.genreId
                        JOIN RegisteredUser R ON R.userId= T.userId
    )
    SELECT FG.userId, FG.age, FG.genreName
    FROM user_favorite_genre FG
    WHERE FG.num_genres > 1 AND FG.rank_genres <= 2 AND FG.userId=${userId};`

    connection.query(query,
        function(error, results, fields){
        if (error){
            console.log(error)
            res.json({error: error})
        } else {
            res.json({results: results})
        }
        })
}

async function make_comments(req, res){
    const userId = req.query.userId;
    const animeId = req.query.animeId;
    const comment = req.query.comment;
    const rating = req.query.rating;
    connection.query(`
    SELECT * FROM ReviewedBy WHERE userId=? AND animeId=?;`, [userId, animeId]
        ,
        function(error, results, fields){
        if (error){
            console.log(error)
            res.json({message: error})
        } else {
            if (results.length > 0){
                res.json({message: `You have commented Anime with Id ${animeId}`})
            } else {
                connection.query(`INSERT INTO ReviewedBy VALUE (?, ?, ?, ?);`, [userId, animeId, comment, rating],
                    function (error, results, fields) {
                        if (error){
                            res.json({message: error})
                        } else {
                            res.json({message: "Comment Successful."})
                        }
                    })
            }
        }
        })
}

async function get_avg_score(req, res){
    const animeId = req.query.animeId;
    let query = `WITH
    COMPLETE_WATCH_ANIME AS (
        SELECT W.animeID, W.userId
        FROM Watched W
        WHERE W.status = 'Completed'
    ),
     REVIEW_ANIME AS (
         SELECT A2.animeId, ROUND(AVG(RB.rating), 2) AS avg_audience_score
         FROM Anime A2 JOIN ReviewedBy RB on A2.animeId = RB.animeId
                       JOIN RegisteredUser R on RB.userId = R.userId
         WHERE R.userId IN (SELECT distinct userId
                            FROM Watched)
         AND A2.animeId=${animeId}
     ),
     COMPLETE_REVIEW_ANIME AS (
         SELECT A2.animeId, ROUND(AVG(RB.rating), 2) AS avg_complete_audience_score
         FROM Anime A2 JOIN ReviewedBy RB on A2.animeId = RB.animeId
                       JOIN RegisteredUser R on RB.userId = R.userId
         WHERE R.userId IN (SELECT distinct userId
                            FROM COMPLETE_WATCH_ANIME)
         AND A2.animeId=${animeId}
     )
    SELECT A.animeId, A.title, A.score, RA.avg_audience_score, CA.avg_complete_audience_score
    FROM REVIEW_ANIME RA, COMPLETE_REVIEW_ANIME CA, Anime A
    WHERE A.animeId = RA.animeId AND RA.animeId = CA.animeID;`

    connection.query(query,
        function(error, result, fields){
        if (error){
            res.json({error: error})
        } else {
            res.json({result: result})
        }
        })
}

async function percentage_complete_like(req, res){
    const userId = req.query.userId;
    console.log(userId)
    if(userId){
    let query = `WITH t1 as (
        SELECT u.userId, w.animeId
        FROM User u
        JOIN Watched w on u.userId = w.userid
        JOIN Anime a on w.animeID = a.animeId
        WHERE status = 'Completed' AND w.userid=${userId}),

        t2 as (
        SELECT l.userId, l.animeId
        FROM likeAnime l
        JOIN Anime a on a.animeId = l.animeId
        WHERE l.userId=${userId}),

        t3 as (
        SELECT t1.userId, if(t1.animeID in (SELECT t2.animeId from t2 where t1.userId = t2.userId), 1, 0) as likes_watched
        FROM t1)

        SELECT userId, sum(likes_watched) AS total_watch, round(100 * (cast(sum(likes_watched) as float) / cast(count(userId) as float)), 2) as percentOfLikesWatched
        FROM t3
        GROUP BY userId;`

    connection.query(query,
        function(error, result, fields){
        if (error){
            res.json({error: error})
        } else {
            res.json({result: result})
        }
        })
    }
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
    find_comments_for_user,
    find_comments_for_anime,
    search_animations,
    all_user,
    search_users,
    find_single_user,
    animations_sort_rating,
    animations_sort_aired,
    animations_sort_most_viewed,
    friend_recommendation,
    user_favourite_genre,
    make_comments,
    get_avg_score,
    percentage_complete_like
}
