import mysql from "mysql";

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hyfpassword",
  database: "world",
});

//connect
db.connect((error) => {
  if (error) throw error;
  console.log("connected");
});

//1.What are the names of countries with population greater than 8 million?
export const populationGreater8 = (req, res) => {
  let sql = "SELECT name FROM city WHERE population>8000000";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

//2.What are the names of countries that have “land” in their names?
export const countriesHaveLand = (req, res) => {
  let sql = "SELECT name FROM city WHERE name like '%land%'";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

//3.What are the names of the cities with population in between 500,000 and 1 million?
export const populationBetween = (req, res) => {
  let sql = "SELECT name FROM city WHERE population between 500000 and 1000000";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

//4.What's the name of all the countries on the continent ‘Europe’?
export const europeanCountries = (req, res) => {
  let sql = "SELECT name FROM country WHERE Continent='Europe'";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

//5.List all the countries in the descending order of their surface areas.
export const surfaceAreas = (req, res) => {
  let sql = "SELECT name FROM country ORDER BY SurfaceArea DESC";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

//6.What are the names of all the cities in the Netherlands?
export const citiesOfNetherlands = (req, res) => {
  let sql = "SELECT name FROM city WHERE CountryCode='NLD'";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

//7.What is the population of Rotterdam?
export const populationOfRotterdam = (req, res) => {
  let sql = "SELECT name,population FROM city WHERE name='Rotterdam'";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

//8.What's the top 10 countries by Surface Area?
export const surfaceAreasTop10 = (req, res) => {
  let sql = "SELECT name FROM country ORDER BY SurfaceArea DESC LIMIT 10";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

//9.What's the top 10 most populated cities?
export const populatedCitiesTop10 = (req, res) => {
  let sql = "SELECT name FROM city ORDER BY Population DESC LIMIT 10";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

//10.What is the population number of the world?
export const worldPopulationNumber = (req, res) => {
  let sql = "SELECT SUM(Population) FROM country";
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};
