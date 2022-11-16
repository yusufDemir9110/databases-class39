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
  const transferCommand = [
    `START TRANSACTION`,
    `UPDATE account SET balance = balance - 1000 WHERE account_number = 101 `,
    `UPDATE account SET balance = balance + 1000 WHERE account_number = 102 `,
    `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (101, -1000, '2022-11-16','from father');`,
    `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (102,  1000, '2022-11-16','to son');`,
    `COMMIT`,
  ];

  try {
    transferCommand.forEach((command) => {
      db.query(command, (err, result) => {
        if (err) throw err;
        console.log(result);
      });
    });
  } catch (error) {
    db.query(`ROLLBACK`);
  }
};

transfer();
