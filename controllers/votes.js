import votesService from "../services/vote.js";

async function createVote(req, res) {
  return votesService
    .createVote(req.body)
    .then(function (vote) {
      return res.status(201).json(vote);
    })
    .catch(function (err) {
      return res.status(500).json({ msg: err });
    });
}

async function getVoteGames(req, res) {
  try {
    const judgeId = req.params.judgeId; // Asume que el ID del juez está en los parámetros de la solicitud
    const votes = await votesService.getVoteGames(judgeId);
    res.status(200).json(votes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener las votaciones del juez: " });
  }
}

async function getVoteJudges(req, res) {
  try {
    const gameId = req.params.gameId; // Asume que el ID del juego está en los parámetros de la solicitud
    const votes = await votesService.getVoteJudges(gameId);
    return res.status(200).json(votes);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error al obtener las votaciones del juego: " });
  }
}


export {
  createVote,
  getVoteGames,
  getVoteJudges,

};
export default {
  createVote,
  getVoteGames,
  getVoteJudges,

};
