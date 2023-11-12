import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("AH_2023");
const judgesCollection = db.collection("judges");

async function createJudge(judge) {
  await client.connect;
  const newJudge = { ...judge };
  await judgesCollection.insertOne(newJudge);
  return newJudge;
}

async function judgeExists(judgeId) {
  await client.connect;

  const idPattern = /^[0-9a-fA-F]{24}$/;
  if (typeof judgeId !== 'string' || !idPattern.test(judgeId)) {
    throw new Error("ID de juez no válido. Debe ser una cadena de 24 caracteres hexadecimales.");
  }

  if (typeof judgeId !== 'string' || judgeId.trim() === '') {
    throw new Error("ID de juez no válido. Debe ser una cadena no vacía.");
  }

    const judge = await judgesCollection.findOne({ _id: new ObjectId(judgeId) });

    if (!judge) {
      return null;
    }

    return judge._id.toString();

}

export { createJudge, judgeExists };
export default { createJudge, judgeExists };
