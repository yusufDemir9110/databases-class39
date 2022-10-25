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

export const findAuthorsMentors = (req, res) => {
  let sql =
    "SELECT a.author_name as author, m.author_name as mentor from authors a left join authors m on m.author_id=a.mentor";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

export const findAuthorsPapers = (req, res) => {
  let sql =
    "SELECT author_name, paper_title FROM authors LEFT JOIN authors_Papers ON authors.author_id=authors_Papers.author_id LEFT JOIN research_Papers ON authors_Papers.paper_id=research_Papers.paper_id";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};
