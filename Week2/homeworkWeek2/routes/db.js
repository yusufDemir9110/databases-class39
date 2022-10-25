import express from "express";
import { createAuthorTable } from "../controllers/keys_ex_1.js";
import { createPaperTable } from "../controllers/relationships_ex_2.js";
import { findAuthorsMentors } from "../controllers/joins_ex_3.js";
import { findAuthorsPapers } from "../controllers/joins_ex_3.js";
import { findPapersAuthorsCount } from "../controllers/aggregate_ex_4.js";
import { findPapersByFemaleSum } from "../controllers/aggregate_ex_4.js";
import { findAverageHIndex } from "../controllers/aggregate_ex_4.js";
import { findPapersPerUniversity } from "../controllers/aggregate_ex_4.js";
import { findMinMaxHPerUniversity } from "../controllers/aggregate_ex_4.js";

const router = express.Router();

router.get("/createauthortable", createAuthorTable);
router.get("/createpapertable", createPaperTable);
router.get("/findauthorsmentors", findAuthorsMentors);
router.get("/findauthorspapers", findAuthorsPapers);
router.get("/findpapersauthorscount", findPapersAuthorsCount);
router.get("/findpapersbyfemalesum", findPapersByFemaleSum);
router.get("/findaveragehindex", findAverageHIndex);
router.get("/findpapersperuniversity", findPapersPerUniversity);
router.get("/findminmaxhperuniversity", findMinMaxHPerUniversity);

export default router;
