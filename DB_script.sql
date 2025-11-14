-- MySQL Workbench Forward Engineering (Final – No SQL_MODE)

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

DROP SCHEMA IF EXISTS `mydb`;
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8;
USE `mydb`;

-- ---------------------------
-- Users table
-- ---------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `mobile` CHAR(10) NOT NULL,
  `birth` DATE NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE = InnoDB;

-- ---------------------------
-- Movies table
-- ---------------------------
CREATE TABLE IF NOT EXISTS `movies` (
  `movie_id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `release_date` DATE NOT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE = InnoDB;

-- ---------------------------
-- Reviews table
-- ---------------------------
CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` INT NOT NULL AUTO_INCREMENT,
  `movie_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `review` VARCHAR(100),
  `modified` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rating` INT,
  PRIMARY KEY (`review_id`),

  CONSTRAINT `fk_reviews_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT `fk_reviews_movie`
    FOREIGN KEY (`movie_id`)
    REFERENCES `movies` (`movie_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE INDEX `idx_reviews_movie` ON `reviews` (`movie_id`);
CREATE INDEX `idx_reviews_user` ON `reviews` (`user_id`);

-- ---------------------------
-- Shares table
-- ---------------------------
CREATE TABLE IF NOT EXISTS `shares` (
  `review_id` INT NOT NULL,
  `user_id` INT NOT NULL,

  PRIMARY KEY (`review_id`, `user_id`),

  CONSTRAINT `fk_shares_review`
    FOREIGN KEY (`review_id`)
    REFERENCES `reviews` (`review_id`)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT `fk_shares_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE INDEX `idx_shares_review` ON `shares` (`review_id`);
CREATE INDEX `idx_shares_user` ON `shares` (`user_id`);

-- Restore checks
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
