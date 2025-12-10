-- create the tables for our movies
DROP TABLE IF EXISTS movies;
CREATE TABLE IF NOT EXISTS `movies` (
   `movieid` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `title` varchar(100) NOT NULL,
   `year` char(4) DEFAULT NULL,
   PRIMARY KEY (`movieid`)
);

DROP TABLE IF EXISTS actors;
CREATE TABLE IF NOT EXISTS `actors` (
   `actorid` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `firstNames` varchar(100) NOT NULL,
   `lastname` varchar(100) NOT NULL,
   `dob` char(10) DEFAULT NULL,
   PRIMARY KEY (`actorid`)
);

-- insert data into the tables
INSERT INTO movies
VALUES (1, "Elizabeth", "1998"),
   (2, "Black Widow", "2021"),
   (3, "Oh Brother Where Art Thou?", "2000"),
   (
      4,
      "The Lord of the Rings: The Fellowship of the Ring",
      "2001"
   ),
   (5, "Up in the Air", "2009"), (6, "Testmovie", "2006");

INSERT INTO actors
VALUES (1, "Dwayne", "Johnson", "1999-09-14");