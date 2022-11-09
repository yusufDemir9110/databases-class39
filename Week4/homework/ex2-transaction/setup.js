import data from "./data.json";

const setup = async (client) => {
  const hasCollection = await client
    .db("databaseWeek4")
    .listCollection({ name: "transfer" })
    .hasNext();

  if (hasCollection) {
    const transferCollection = await client
      .db("databaseWeek4")
      .collection("transfer");

    await transferCollection.deleteMany({});

    await transferCollection.insertMany({ data });
  }
};

export default setup;
