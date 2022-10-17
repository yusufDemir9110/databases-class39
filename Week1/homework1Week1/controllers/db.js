import mysql from "mysql";

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hyfpassword",
  database: "meetup",
});

//connect
db.connect((error) => {
  if (error) throw error;
  console.log("connected");
});

//creat db
export const createDb = (req, res) => {
  let sql = "CREATE DATABASE meetup";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send("database created...");
    console.log(result);
  });
};

//create table
export const createInviteeTable = (req, res) => {
  db.config.database = "meetup";
  let sql =
    "CREATE TABLE invitee(invitee_no int AUTO_INCREMENT, invite_name varchar(128), invited_by varchar(128), PRIMARY KEY(invitee_no))";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send("InviteeTable Created...");
  });
};

export const createRoomTable = (req, res) => {
  db.config.database = "meetup";
  let sql =
    "CREATE TABLE room(room_no int AUTO_INCREMENT, room_name varchar(128), floor_number int, PRIMARY KEY(room_no))";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send("RoomTable Created...");
  });
};

export const createMeetingTable = (req, res) => {
  db.config.database = "meetup";
  let sql =
    "CREATE TABLE meeting(meeting_no int AUTO_INCREMENT, meeting_title varchar(256),starting_time time, ending_time time, room_no int, PRIMARY KEY(meeting_no))";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send("MeetingTable Created...");
  });
};

//insert
export const insertInviteeTable = (req, res) => {
  db.config.database = "meetup";
  let sql = "INSERT INTO invitee(invite_name, invited_by) VALUES ?";
  let inviteeData = [
    ["invitee one", "John Doe"],
    ["invitee two", "Jane Doe"],
    ["invitee three", "Jack Doe"],
    ["invitee four", "John Doe"],
    ["invitee five", "Jeff Doe"],
  ];

  db.query(sql, [inviteeData], (error, result) => {
    if (error) throw error;
    res.send("inviteeData added...");
  });
};

export const insertRoomTable = (req, res) => {
  db.config.database = "meetup";
  let sql = "INSERT INTO room(room_name,floor_number) VALUES ?";
  let roomData = [
    ["room one", 2],
    ["room two", 2],
    ["room three", 3],
    ["room four", 3],
    ["room five", 4],
  ];

  db.query(sql, [roomData], (error, result) => {
    if (error) throw error;
    res.send("roomData added...");
  });
};

export const insertMeetingTable = (req, res) => {
  db.config.database = "meetup";
  let sql =
    "INSERT INTO meeting(meeting_title,starting_time,ending_time,room_no) VALUES ?";
  let meetingData = [
    ["meeting one", "12:25:00", "13:30:00", 5],
    ["room two", "11:00:00", "13:30:00", 4],
    ["room three", "10:25:00", "16:30:00", 3],
    ["room four", "14:25:00", "17:30:00", 2],
    ["room five", "15:25:00", "18:30:00", 1],
  ];

  db.query(sql, [meetingData], (error, result) => {
    if (error) throw error;
    res.send("meetingData added...");
  });
};
