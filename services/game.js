import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("AH_2023");
const gamesCollection = db.collection("games");
const votesCollection = db.collection("votes");

//Esta funcion trae todos los games ya filtrados y en formato de objeto
async function getGames(filter = {}) {
  await client.connect;
  const filterMongo = filterQueryToMongo(filter);
  return gamesCollection.find(filterMongo).toArray();
}

async function getGamesByEdition(edition, query) {
  await client.connect;
  const games = await gamesCollection.find({ edition, ...query }).toArray();
  for (const game of games) {
    const votes = await votesCollection
      .find({ gameId: game._id.toString() })
      .toArray();
    const votesTotalPoints = getVotesTotalPoints(votes);
    game.totalPoints = votesTotalPoints;
  }

  games.sort((a, b) => b.totalPoints - a.totalPoints);

  return games;
}

function getVotesTotalPoints(votes) {
  let total = 0;
  for (const vote of votes) {
    const totalPoints = vote.totalPoints;
    total += totalPoints;
  }
  return total;
}

function filterQueryToMongo(filter) {
  const filterMongo = {};

  for (const field in filter) {
    filterMongo[field] = parseInt(filter[field]);
  }
  return filterMongo;
}

//Esta funcion devuelve un game que se busca por id
async function getGameById(id) {
  await client.connect;
  return gamesCollection.findOne({ _id: new ObjectId(id) });
}

async function createGame(game) {
  await client.connect;
  const newgame = { ...game };
  await gamesCollection.insertOne(newgame);
  return newgame;
}

async function updateGame(idgame, updateGameBody) {
  await client.connect();
  const game = await getGameById(idgame);
  if (!game) {
    throw { code: 404, msg: "Juego no encontrado" };
  }

  const updatedGame = { ...game, ...updateGameBody };
  await gamesCollection.updateOne(
    { _id: new ObjectId(idgame) },
    { $set: updatedGame }
  );
  return updatedGame;
}

async function deleteGame(idgame) {
  await client.connect();

  try {
    const gameId = new ObjectId(idgame);
    const existingGame = await getGameById(idgame);
    if (!existingGame) {
      throw { code: 404, msg: "Juego no encontrado" };
    }

    const result = await gamesCollection.deleteOne({ _id: gameId });

    return result;
  } catch (err) {
    console.error("Error al eliminar el juego:", err);
    throw { code: 500, msg: "No se pudo eliminar el juego" };
  }
}

async function gameExists(gameId) {
  await client.connect();
  const idPattern = /^[0-9a-fA-F]{24}$/;
  if (typeof gameId !== "string" || !idPattern.test(gameId)) {
    throw new Error(
      "ID del juego no válido. Debe ser una cadena de 24 caracteres hexadecimales."
    );
  }

  if (typeof gameId !== "string" || gameId.trim() === "") {
    throw new Error("ID del juego no válido. Debe ser una cadena no vacía.");
  }
  const game = await gamesCollection.findOne({ _id: new ObjectId(gameId) });
  if (!game) {
    return null;
  }
  return game._id.toString();
}

async function getAverageScoresById(gameId) {
  await client.connect();

  try {
    const game = await gamesCollection.findOne({ _id: new ObjectId(gameId) });
    if (!game) {
      throw new Error("Juego no encontrado");
    }

    const votes = await votesCollection.find({ gameId }).toArray();
    if (votes.length === 0) {
      return res
        .status(200)
        .json({ msg: "El juego no tiene votaciones aún", game });
    }

    const points = { jugabilidad: 0, arte: 0, afinidad: 0, sonido: 0 };

    for (const vote of votes) {
      points.jugabilidad += vote.points.jugabilidad;
      points.arte += vote.points.arte;
      points.afinidad += vote.points.afinidad;
      points.sonido += vote.points.sonido;
    }

    const totalVotes = votes.length;

    points.jugabilidad /= totalVotes;
    points.arte /= totalVotes;
    points.afinidad /= totalVotes;
    points.sonido /= totalVotes;

    parsePoints(points);

    game.averagePoints = {};

    game.averagePoints = points;
    game.totalVotes = totalVotes;

    return game;
  } catch (error) {
    console.error("Error al calcular el promedio de puntuaciones:", error);
    return res
      .status(500)
      .json({ msg: "Error interno al calcular el promedio de puntuaciones" });
  }
}

function parsePoints(points) {
  points.jugabilidad = parseFloat(points.jugabilidad.toFixed(2));
  points.arte = parseFloat(points.arte.toFixed(2));
  points.afinidad = parseFloat(points.afinidad.toFixed(2));
  points.sonido = parseFloat(points.sonido.toFixed(2));
}

export {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  gameExists,
  getAverageScoresById,
  getGamesByEdition,
};
export default {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  gameExists,
  getAverageScoresById,
  getGamesByEdition,
};
