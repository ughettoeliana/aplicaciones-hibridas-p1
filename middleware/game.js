import { gameCreateSchema, gameUpdateSchema } from "../schemas/game.js";

export function validateCreateGame(req, res, next) {
  gameCreateSchema
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

export async function validateUpdateGame(req, res, next) {
  try {
    const validatedGame = await gameUpdateSchema.validate(req.body, {
      stripUnknown: true,
    });

    req.body = validatedGame;

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
