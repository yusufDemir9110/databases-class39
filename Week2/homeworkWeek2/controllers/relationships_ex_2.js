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

export const createPaperTable = (req, res) => {
  let createPaperTableCommand =
    "CREATE TABLE research_Papers(paper_id int AUTO_INCREMENT, paper_title varchar(128), conference varchar(128), publish_date date, PRIMARY KEY(paper_id))";
  let createAuthorsPapersTableCommand =
    "CREATE TABLE authors_Papers(authors_papers_id int AUTO_INCREMENT, author_id int, paper_id int, PRIMARY KEY(authors_papers_id))";
  let addFkAuthors =
    "ALTER TABLE authors_Papers ADD CONSTRAINT FK_author FOREIGN KEY(author_id) REFERENCES authors(author_id)";
  let addFkPapers =
    "ALTER TABLE authors_Papers ADD CONSTRAINT FK_paper FOREIGN KEY(paper_id) REFERENCES research_Papers(paper_id)";
  let insertAuthorsCommand =
    "INSERT INTO authors(author_name, university, date_of_birth, h_index, gender,mentor) VALUES ?";
  let authorsData = [
    ["Jack Sparrow", "Yale", "1978-10-10", "15", "male", null],
    ["Jack Reacher", "Amsterdam", "1990-02-10", "8", "male", 1],
    ["Black Widow", "Groningen", "1965-10-12", "7", "female", 1],
    ["Jack Peralta", "Brooklyn", "1980-10-10", "12", "male", null],
    ["John Reese", "Istanbul", "1980-05-10", "16", "male", 4],
    ["She Hulk", "MIT", "1955-10-10", "4", "female", 4],
    ["William Butcher", "Cambridge", "1975-01-10", "5", "male", 4],
    ["Walter White", "Brooklyn", "1956-05-11", "4", "male", 3],
    ["Captain Marvel", "Yale", "1990-05-10", "8", "female", 3],
    ["John Snow", "Amsterdam", "1955-10-07", "9", "male", 6],
    ["John Doe", "Yale", "1988-11-10", "7", "neither", 6],
    ["Wonder Women", "Brooklyn", "1985-10-02", "9", "female", 6],
    ["Thomas Shelby", "MIT", "1969-05-02", "1", "male", 1],
    ["Jane Doe", "Rome", "1956-05-10", "8", "neither", 1],
    ["Kimmy Unbreakable", "Istanbul", "1969-03-02", "4", "female", 2],
  ];

  let insertPapersCommand =
    "INSERT INTO research_Papers(paper_title,conference,publish_date) VALUES ?";
  let papersData = [
    ["Medical Developments", "Medical Developments Conference", "2020-02-05"],
    [
      "Technological Developments",
      "Technological Developments Conference",
      "2019-02-05",
    ],
    [
      "Alternative Developments",
      "Alternative Developments Conference",
      "2020-03-10",
    ],
    [
      "Artificial Developments",
      "Artificial Developments Conference",
      "2019-09-05",
    ],
    [
      "Architectural Developments",
      "Architectural Developments Conference",
      "2018-10-12",
    ],
    [
      "Agricultural Developments",
      "Agricultural Developments Conference",
      "2021-01-05",
    ],
    [
      "Mathematical Developments",
      "Mathematical Developments Conference",
      "2015-08-05",
    ],
    [
      "Geometrical Developments",
      "Geometrical Developments Conference",
      "2022-02-05",
    ],
    [
      "Biological Developments",
      "Biological Developments Conference",
      "2019-03-03",
    ],
    [
      "Chemistry Developments",
      "Chemistry Developments Conference",
      "2020-02-18",
    ],
    [
      "Environmental Developments",
      "Environmental Developments Conference",
      "2017-10-25",
    ],
    ["Historical Facts", "Historical Facts Conference", "2018-02-05"],
    ["Technological Facts", "Technological Facts Conference", "2020-08-15"],
    ["Medical Facts", "Medical Facts Conference", "2019-08-05"],
    ["Mechanic", "Mechanic Conference", "2019-12-05"],
    ["Electronic", "Electronic Conference", "2015-08-13"],
    ["Hydrolic", "Hydrolic Conference", "2010-02-05"],
    ["Semantic", "Semantic Conference", "2012-09-10"],
    ["Orthopedic", "Orthopedic Conference", "2018-05-18"],
    ["Neurologic", "Neurologic Conference", "2018-12-05"],
  ];
  let insertAuthorsPapersCommand =
    "INSERT INTO authors_Papers(author_id,paper_id) VALUES ?";
  let authorsPapersData = [
    [1, 12],
    [1, 15],
    [1, 20],
    [2, 5],
    [2, 12],
    [3, 1],
    [3, 2],
    [3, 18],
    [4, 1],
    [5, 16],
    [5, 20],
    [6, 1],
    [6, 15],
    [7, 9],
    [7, 18],
    [8, 19],
    [9, 1],
    [9, 8],
    [9, 16],
    [10, 10],
    [11, 2],
    [11, 16],
    [12, 12],
    [14, 5],
    [14, 18],
    [15, 5],
  ];

  db.query(createPaperTableCommand, (err, result) => {
    if (err) throw err;
  });
  db.query(createAuthorsPapersTableCommand, (err, result) => {
    if (err) throw err;
  });
  db.query(addFkAuthors, (err, result) => {
    if (err) throw err;
  });
  db.query(addFkPapers, (err, result) => {
    if (err) throw err;
  });
  db.query(insertAuthorsCommand, [authorsData], (err, result) => {
    if (err) throw err;
  });
  db.query(insertPapersCommand, [papersData], (err, result) => {
    if (err) throw err;
  });
  db.query(insertAuthorsPapersCommand, [authorsPapersData], (err, result) => {
    if (err) throw err;
  });
  res.send("ex2 has completed...");
};
