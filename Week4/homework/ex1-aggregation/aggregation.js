import { MongoClient, ObjectId } from "mongodb";

const main = async () => {
  const uri = "mongodb://localhost";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await totalPopulationPerYear(client, "Netherlands");
    await totalPopulationPerContinent(client, 2020, "100+");
  } finally {
    await client.connect();
  }
};

main();

const totalPopulationPerYear = async (client, country) => {
  const pipeline = [
    { $match: { Country: country } },
    {
      $group: {
        _id: "$Year",
        countryPopulation: { $sum: { $add: ["$M", "$F"] } },
      },
    },
    { $sort: { _id: 1 } },
  ];

  const aggCursor = client
    .db("databaseWeek4")
    .collection("countries")
    .aggregate(pipeline);

  await aggCursor.forEach((item) => {
    console.log(item);
  });
};

const totalPopulationPerContinent = async (client, year, age) => {
  const pipeline = [
    {
      $match: {
        Year: year,
        Age: age,
        Country: {
          $in: [
            "AFRICA",
            "ASIA",
            "EUROPE",
            "LATIN AMERICA AND THE CARIBBEAN",
            "NORTHERN AMERICA",
            "OCEANIA",
          ],
        },
      },
    },
    {
      $group: {
        _id: "$Country",
        Country: { $first: "$Country" },
        Year: { $first: year },
        Age: { $first: age },
        M: { $first: "$M" },
        F: { $first: "$F" },
        TotalPopulation: { $sum: { $add: ["$M", "$F"] } },
      },
    },
    { $sort: { _id: 1 } },
  ];

  const aggCursor = client
    .db("databaseWeek4")
    .collection("countries")
    .aggregate(pipeline);

  await aggCursor.forEach((item) => {
    console.log(item);
  });
};
