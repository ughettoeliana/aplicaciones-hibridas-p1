import express from "express";
import gameController from "../controllers/games.js";
 import voteController from "../controllers/votes.js";
import judgeController from "../controllers/judge.js";
import { validateCreateGame, validateUpdateGame } from "../middleware/game.js";
import { validateCreateVote } from "../middleware/vote.js";


const route = express.Router();

 //CRUD de los juegos
route.get("/games", gameController.getGames);
route.get("/games/:idgame", gameController.getGameById);
route.post("/games",[validateCreateGame] ,gameController.createGame);
route.patch("/games/:idgame",[validateUpdateGame] ,gameController.updateGame);
route.delete("/games/:idgame",gameController.deleteGame);

route.post('/judges', judgeController.createJudge);

route.post('/votes',[validateCreateVote] , voteController.createVote);
route.get('/games-points-average/:gameId', gameController.getAverageScoresById);
route.get('/votes-games/:judgeId', voteController.getVoteGames);
route.get('/votes-judges/:gameId',voteController.getVoteJudges);
route.get('/games-by-edition/:edition', gameController.getGamesByEdition)


export default route