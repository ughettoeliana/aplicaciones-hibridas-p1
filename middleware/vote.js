import { voteSchema } from "../schemas/votes.js";
import votesService from "../services/vote.js";
import judgeService from "../services/judge.js";
import gameService from "../services/game.js";

export function validateCreateVote(req, res, next) {
  const newVoteData = req.body;

  judgeService
    .judgeExists(newVoteData.judgeId)
    .then((judgeExists) => {
      if (judgeExists == null) {
        return res
          .status(400)
          .json({ msg: "El juez no existe no puedes votar" });
      }

      return gameService.gameExists(newVoteData.gameId);
    })
    .then((gameExists) => {
      if (gameExists == null) {
        throw new Error("El JUEGO no existe. No se puede votar.");
      }

      if (gameExists) {
        return votesService.hasJudgeVoted(
          newVoteData.judgeId,
          newVoteData.gameId
        );
      }
    })
    .then((validToVote) => {
      if (!validToVote) {
        return voteSchema.validate(newVoteData);
      } else {
        return res.status(200).json({ msg: "Ya votaste por este juego." });
      }
    })
    .then(() => {
      next();
    })
    .catch((error) => {
      let errorMessage = "Error al validar la votación";

      if (error && error.message) {
        errorMessage += `: ${error.message}`;
      }

      return res.status(500).json({ msg: errorMessage });
    });
}
