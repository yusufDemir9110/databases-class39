import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hyfpassword",
  database: "hyf_homework_week3",
});

db.connect((err) => {
  if (err) throw err;
});

const insertToAccount = () => {
  let insertAccountCommand = "insert into account values ?";
  let accountData = [
    [101, 2125],
    [102, 1260],
    [103, 3450],
    [104, 2170],
  ];
  db.query(insertAccountCommand, [accountData], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

const insertToAccountChange = () => {
  let insertAccountChangeCommand = "insert into account_changes values ?";
  let accountChangeData = [
    [0001, 101, 50, "2022-10-25", "for market shopping"],
    [0002, 101, 525, "2022-10-26", "house rent price"],
    [0003, 102, 40, "2022-10-29", "for car"],
    [0004, 103, 100, "2022-10-22", "for shopping"],
    [0005, 104, 200, "2022-10-22", "for avm shopping"],
  ];
  db.query(insertAccountChangeCommand, [accountChangeData], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

insertToAccount();
insertToAccountChange();
