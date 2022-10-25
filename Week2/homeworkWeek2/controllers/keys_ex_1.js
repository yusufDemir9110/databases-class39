import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hyfpassword",
  database: "hyf_homework_week2",
});

db.connect((error) => {
  if (error) throw error;
  console.log("connected");
});

export const createAuthorTable = (req, res) => {
  let createAuthorTableCommand =
    'CREATE TABLE authors(author_id int AUTO_INCREMENT, author_name varchar(128), university varchar(128), date_of_birth date, h_index int, gender enum("male","female","neither"), PRIMARY KEY(author_id));';
  let addMentorColumn = " ALTER TABLE authors ADD COLUMN mentor INT;";
  let addFk =
    "ALTER TABLE authors ADD CONSTRAINT FK_mentor FOREIGN KEY(mentor) REFERENCES authors(author_id) ";
  db.query(createAuthorTableCommand, (err, result) => {
    if (err) throw err;
  });
  db.query(addMentorColumn, (err, result) => {
    if (err) throw err;
  });
  db.query(addFk, (err, result) => {
    if (err) throw err;
  });
  res.send("ex1 has completed");
};
