DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;

-- CREATE TABLE students (
--   id int NOT NULL AUTO_INCREMENT,
--   quantity integer NOT NULL,
--   description varchar(50) NOT NULL,
--   PRIMARY KEY (ID)
-- );

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

CREATE TABLE students (
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  birth_date DATE,
  cohort int NOT NULL
);

