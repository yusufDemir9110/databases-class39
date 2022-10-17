import express from "express";
import {
  createDb,
  createInviteeTable,
  createRoomTable,
  createMeetingTable,
  insertInviteeTable,
  insertRoomTable,
  insertMeetingTable,
} from "../controllers/db.js";

const router = express.Router();

router.get("/createdb", createDb);
router.get("/createinviteetable", createInviteeTable);
router.get("/createroomtable", createRoomTable);
router.get("/createmeetingtable", createMeetingTable);

router.get("/insertinviteetable", insertInviteeTable);
router.get("/insertroomtable", insertRoomTable);
router.get("/insertmeetingtable", insertMeetingTable);

export default router;
