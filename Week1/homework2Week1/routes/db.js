import express from "express";
import {
  populationGreater8,
  countriesHaveLand,
  populationBetween,
  europeanCountries,
  surfaceAreas,
  citiesOfNetherlands,
  populationOfRotterdam,
  surfaceAreasTop10,
  populatedCitiesTop10,
  worldPopulationNumber,
} from "../controllers/db.js";

const router = express.Router();

router.get("/populationgreater8", populationGreater8);
router.get("/countrieshaveland", countriesHaveLand);
router.get("/populationbetween", populationBetween);
router.get("/europeancountries", europeanCountries);
router.get("/surfaceareas", surfaceAreas);
router.get("/citiesofnetherlands", citiesOfNetherlands);
router.get("/populationofrotterdam", populationOfRotterdam);
router.get("/surfaceareastop10", surfaceAreasTop10);
router.get("/populatedcitiestop10", populatedCitiesTop10);
router.get("/worldpopulationnumber", worldPopulationNumber);

export default router;
