import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

client
  .connect()
  .then(async function () {
    console.log("Conectado a Mongo");
    const db = client.db("AH_2023");
    return db
  })
  .catch(function (err) {
    console.log("No me pude conectar a mongo: ", err);
  });
