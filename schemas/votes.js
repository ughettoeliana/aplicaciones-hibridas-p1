import yup from "yup";

const voteSchema = yup.object({
  judgeId: yup.string().required("El ID del juez es obligatorio"),
  gameId: yup.string().required("El ID del juego es obligatorio"),
  points: yup
    .object({
      jugabilidad: yup
        .number()
        .integer()
        .min(1, "El voto de Jugabilidad debe ser mayor o igual a 1")
        .max(10, "El voto de Jugabilidad debe ser menor o igual a 10")
        .required(
          "El campo es requerido"
        ),
      arte: yup
        .number()
        .integer()
        .min(1, "El voto de Arte debe ser mayor o igual a 1")
        .max(10, "El voto de Arte debe ser menor o igual a 10")
        .required(
          "El campo es requerido"
        ),
      afinidad: yup
        .number()
        .integer()
        .min(1, "El voto de Afinidad debe ser mayor o igual a 1")
        .max(10, "El voto de Afinidad debe ser menor o igual a 10")
        .required(
          "El campo es requerido"
        ),
      sonido: yup
        .number()
        .integer()
        .min(1, "El voto de Sonido debe ser mayor o igual a 1")
        .max(10, "El voto de Sonido debe ser menor o igual a 10")
        .required(
          "El campo es requerido"
        ),
    })
    .required(),
});

export { voteSchema };
export default { voteSchema };
