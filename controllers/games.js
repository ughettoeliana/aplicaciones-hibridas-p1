import gamesService from "../services/game.js";

function getGames(req, res) {
  gamesService.getGames(req.query).then(function (games) {
    res.status(200).json(games);
  });
}

function getGameById(req, res) {
  const { idgame } = req.params;
  gamesService
    .getGameById(idgame)
    .then(function (game) {
      return res.status(200).json(game);
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg });
      } else {
        res.status(500).json({ msg: "No se pudo encontrar el juego" });
      }
    });
}


async function getGamesByEdition(req, res) {
  const edition = parseInt(req.params.edition);
  const query = req.query
  gamesService.getGamesByEdition(edition, query).then(function (games) {
    res.status(200).json(games);
  });
}


async function createGame(req, res) {
  return gamesService
    .createGame(req.body)
    .then(function (game) {
      res.status(201).json(game);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
}

async function updateGame(req, res) {
  const { idgame } = req.params;
  const updateGameBody = req.body;
  gamesService
    .updateGame(idgame, updateGameBody)
    .then(function (game) {
      return res.status(200).json(game);
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg });
      } else {
        res.status(500).json({ msg: "No se pudo actualizar el juego." });
      }
    });
}

async function deleteGame(req, res) {
  const { idgame } = req.params;
  const result = await gamesService.deleteGame(idgame);
  if (result.deletedCount === 1) {
    res.status(200).json({ msg: "Juego eliminado correctamente" });
  } else {
    res.status(404).json({ msg: "Juego no encontrado" });
  }
}

async function getAverageScoresById(req, res) {
  const gameId = req.params.gameId;

  await gamesService
    .getAverageScoresById(gameId)
    .then(function (game) {
      res.status(200).json(game);
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg });
      } else {
        res.status(500).json({ msg: "No se pudo encontrar el juego" });
      }
    });
}

export {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  getAverageScoresById,
  getGamesByEdition,
};
export default {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  getAverageScoresById,
  getGamesByEdition,
};
