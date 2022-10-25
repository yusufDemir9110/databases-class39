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

export const findPapersAuthorsCount = (req, res) => {
  let sql =
    "SELECT paper_title, COUNT(author_name) FROM research_Papers LEFT JOIN authors_Papers ON research_Papers.paper_id=authors_Papers.paper_id LEFT JOIN authors ON authors_papers.author_id=authors.author_id GROUP BY paper_title";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

export const findPapersByFemaleSum = (req, res) => {
  let sql =
    "SELECT COUNT(paper_title) FROM research_Papers LEFT JOIN authors_Papers ON research_Papers.paper_id=authors_Papers.paper_id LEFT JOIN authors ON authors_papers.author_id=authors.author_id WHERE authors.gender='female'";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

export const findAverageHIndex = (req, res) => {
  let sql = "SELECT AVG(h_index), university FROM authors GROUP BY university";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

export const findPapersPerUniversity = (req, res) => {
  let sql =
    "SELECT COUNT(paper_title), university FROM research_Papers LEFT JOIN authors_Papers ON research_Papers.paper_id=authors_Papers.paper_id LEFT JOIN authors ON authors_papers.author_id=authors.author_id GROUP BY university";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

export const findMinMaxHPerUniversity = (req, res) => {
  let sql =
    "SELECT university,MIN(h_index), MAX(h_index) FROM authors group by university";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};
