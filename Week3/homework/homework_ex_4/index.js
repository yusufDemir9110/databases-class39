const { MongoClient, ServerApiVersion } = require("mongodb");

const { seedDatabase } = require("./seedDatabase.js");

const dotenv = require("dotenv");

dotenv.config();

async function createEpisodeExercise(client) {
  //to add the last episode of season 9.
  const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .insertOne({
      episode: "S09E13",
      title: "MOUNTAIN HIDE-AWAY",
      elements: [
        "CIRRUS",
        "CLOUDS",
        "CONIFER",
        "DECIDIOUS",
        "GRASS",
        "MOUNTAIN",
        "MOUNTAINS",
        "RIVER",
        "SNOWY_MOUNTAIN",
        "TREE",
        "TREES",
      ],
    });
  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]
  const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ episode: "S02E02" });

  console.log(`The title of episode 2 in season 2 is ${result.title}`);

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]
  const result2 = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ title: "BLACK RIVER" });

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${result2.episode}`
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]

  const cursor = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({
      elements: { $all: ["CLIFF"] },
    });

  const tempResult = await cursor.toArray();
  const result3 = [];

  await tempResult.forEach((element) => {
    result3.push(element.title);
  });
  console.log(`The episodes that Bob Ross painted a CLIFF are ${result3}`);

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]

  const cursor2 = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({
      elements: { $all: ["CLIFF", "LIGHTHOUSE"] },
    });

  const tempResult2 = await cursor2.toArray();
  const result4 = [];

  await tempResult2.forEach((element) => {
    result4.push(element.title);
  });

  console.log(
    `The episodes that Bob Ross painted a CLIFF and LIGHTHOUSE are ${result4}`
  );
}

async function updateEpisodeExercises(client) {
  // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that

  const result5 = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateOne(
      { title: "BLUE RIDGE FALLERS" },
      { $set: { title: "BLUE RIDGE FALLS" } }
    );

  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${result5.modifiedCount} episodes`
  );

  // Unfortunately we made a mistake in the arrays and the element type called 'BUSHES' should actually be 'BUSH' as sometimes only one bush was painted.
  // Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
  // It should update 120 episodes!

  const result6 = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateMany(
      { elements: { $all: ["BUSHES"] } },
      { $set: { elements: { $all: ["BUSH"] } } }
    );

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${result6.modifiedCount} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  // This is episode 14 in season 31. Please remove it and verify that it has been removed!
  const result7 = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .deleteOne({ episode: "S31E14" });

  console.log(
    `Ran a command to delete episode and it deleted ${result7.deletedCount} episodes`
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
