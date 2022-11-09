import { MongoClient } from "mongodb";
import setup from "./setup.js";

import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  const client = new MongoClient(process.env.MONGODB_URL);
  try {
    await client.connect();
    await setup(client);
    await createMoneyTransfer(client, 102, 101, 1000);
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
};

const createMoneyTransfer = async (
  client,
  receiverAccountNumber,
  senderAccountNumber,
  amount
) => {
  const transferCollection = client.db("databaseWeek4").collection("transfer");

  const session = client.startSession();

  try {
    const transactionResults = await session.withTransaction(async () => {
      const updateResults = await transferCollection.updateOne(
        { account_number: receiverAccountNumber },
        { $addToSet: { balance: balance } },
        { session }
      );
      console.log(`Matched count : ${updateResults.matchedCount}`);
      console.log(`Modified count : ${updateResults.modifiedCount}`);
    });
    if (transactionResults) {
      console.log("Successfully sent");
    } else {
      console.log("fail");
    }
  } catch (error) {
    console.error(error);
  } finally {
    await session.endSession();
  }
};

main();
