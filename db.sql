CREATE DATABASE movie_reviews;
USE movie_reviews;


CREATE TABLE users (
                       id INT PRIMARY KEY AUTO_INCREMENT,
                       first_name TEXT,
                       last_name TEXT,
                       email TEXT,
                       password TEXT,
                       mobile TEXT,
                       birth DATE
);


CREATE TABLE movies (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        title TEXT,
                        releasedate DATE
);


CREATE TABLE reviews (
                         id INT PRIMARY KEY AUTO_INCREMENT,
                         movie_id INT,
                         review TEXT,
                         rating INT,
                         user_id INT,
                         modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

                         FOREIGN KEY (user_id)
                             REFERENCES users(id) ON DELETE CASCADE,

                         FOREIGN KEY (movie_id)
                             REFERENCES movies(id) ON DELETE CASCADE
);


CREATE TABLE shares (
                        review_id INT,
                        user_id INT,

                        PRIMARY KEY (review_id, user_id),
                        FOREIGN KEY (review_id)
                            REFERENCES reviews(id) ON DELETE CASCADE,
                        FOREIGN KEY (user_id)
                            REFERENCES users(id) ON DELETE CASCADE
);