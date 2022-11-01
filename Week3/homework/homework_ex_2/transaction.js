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

const transfer = () => {
  let transferCommand =
    'start transaction update account set balance=balance-1000 where account_number="AN101" update account set balance=balance+1000 account_number="AN102" insert into account_change values("CN0006", "AN101",1000,"2022-10-31","Transfer to AN102"),("CN0007", "AN102",1000,"2022-10-31","Transfer from AN101") commit';

  db.query(transferCommand, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

transfer();
