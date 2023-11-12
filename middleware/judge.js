import { judgeSchema } from "../schemas/jugde.js";


export function validateCreateJudge(req, res, next) {
    judgeSchema
      .validate(req.body, {
        stripUnknown: true,
      })
      .then(async function (game) {
        req.body = game;
        next();
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  }