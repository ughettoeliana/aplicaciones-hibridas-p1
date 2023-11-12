import judgeService from "../services/judge.js";

async function createJudge(req, res) {
    return judgeService
      .createJudge(req.body)
      .then(function (game) {
        res.status(201).json(game);
      })
      .catch(function (err) {
        res.status(500).json(err);
      });
  }

export {createJudge};
export default{createJudge};
