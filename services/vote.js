import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("AH_2023");
const votesCollection = db.collection("votes");
const gamesCollection = db.collection("games");
const judgesCollection = db.collection("judges");

async function createVote(vote) {
  await client.connect;
  const { jugabilidad, arte, sonido, afinidad } = vote.points;
  const totalPoints = jugabilidad + arte + sonido + afinidad;
  const newVote = { ...vote, totalPoints };
  await votesCollection.insertOne(newVote);
  return newVote;
}

async function getVoteGames(judgeId) {
  await client.connect;
  const votes = await votesCollection.find({ judgeId }).toArray();
  for (const vote of votes) {
    const game = await gamesCollection.findOne({
      _id: new ObjectId(vote.gameId),
    });
    vote.gameName = game.name;
  }
  //modificar la data para que quede linda para mostrarlo en el front-end
  return votes;
}

async function getVoteJudges(gameId) {
  await client.connect;
  const votes = await votesCollection.find({ gameId }).toArray();
  for (const vote of votes) {
    const judge = await judgesCollection.findOne({
      _id: new ObjectId(vote.judgeId),
    });
    vote.judgeName = judge.name;
  }
  //modificar la data para que quede linda para mostrarlo en el front-end
  return votes;
}

async function hasJudgeVoted(judgeId, gameId) {
  const existingVote = await votesCollection.findOne({ judgeId, gameId });
  return !!existingVote; // Devuelve true si ya votó, false si no
}



export {
  createVote,
  getVoteGames,
  getVoteJudges,
  hasJudgeVoted,
};
export default {
  createVote,
  getVoteGames,
  getVoteJudges,
  hasJudgeVoted,

};
