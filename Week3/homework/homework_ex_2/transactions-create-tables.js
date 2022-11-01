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

const createAccountTable = () => {
  let createAccountTableCommand =
    "create table account(account_number varchar(16), balance float, primary key(account_number))";
  db.query(createAccountTableCommand, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

const createAccountChangesTable = () => {
  let createAccountChangesTableCommand =
    "create table account_changes(change_number varchar(16), account_number varchar(16), amount float, changed_date date, remark varchar(256), primary key(change_number)) ";
  let addConstraint =
    "alter table account_changes add constraint fk_account foreign key(account_number) references account(account_number)";
  db.query(createAccountChangesTableCommand, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  db.query(addConstraint, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

createAccountTable();
createAccountChangesTable();
