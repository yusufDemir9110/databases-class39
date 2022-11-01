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
    ["AN101", 2125],
    ["AN102", 1260],
    ["AN103", 3450],
    ["AN104", 2170],
  ];
  db.query(insertAccountCommand, [accountData], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

const insertToAccountChange = () => {
  let insertAccountChangeCommand = "insert into account_changes values ?";
  let accountChangeData = [
    ["CN0001", "AN101", 50, "2022-10-25", "for market shopping"],
    ["CN0002", "AN101", 525, "2022-10-26", "house rent price"],
    ["CN0003", "AN102", 40, "2022-10-29", "for car"],
    ["CN0004", "AN103", 100, "2022-10-22", "for shopping"],
    ["CN0005", "AN104", 200, "2022-10-22", "for avm shopping"],
  ];
  db.query(insertAccountChangeCommand, [accountChangeData], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

insertToAccount();
insertToAccountChange();
