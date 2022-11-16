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
  senderAccountNumber,
  receiverAccountNumber,
  amount
) => {
  const transferCollection = client.db("databaseWeek4").collection("transfer");

  const session = client.startSession();

  try {
    const transactionResults = await session.withTransaction(async () => {
      const updateResultsSender = await transferCollection.updateOne(
        { account_number: senderAccountNumber },
        {
          $inc: { balance: amount * -1 },
          $addToSet: {
            account_changes: {
              change_number: 1001,
              amount: amount * -1,
              changed_date: "2022-11-16",
              remark: "from father",
            },
          },
        },
        { session }
      );
      const updateResultsReceiver = await transferCollection.updateOne(
        { account_number: receiverAccountNumber },
        {
          $inc: { balance: amount * 1 },
          $addToSet: {
            account_changes: {
              change_number: 1002,
              amount: amount * 1,
              changed_date: "2022-11-16",
              remark: "to son",
            },
          },
        },
        { session }
      );
      console.log(`Sender Matched count : ${updateResultsSender.matchedCount}`);
      console.log(
        `Sender Modified count : ${updateResultsSender.modifiedCount}`
      );
      console.log(
        `Receiver Matched count : ${updateResultsReceiver.matchedCount}`
      );
      console.log(
        `Receiver Modified count : ${updateResultsReceiver.modifiedCount}`
      );
    });
    if (transactionResults) {
      console.log("Successfully sent");
    } else {
      console.log("fail");
    }
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
  } finally {
    await session.endSession();
  }
};

main();
