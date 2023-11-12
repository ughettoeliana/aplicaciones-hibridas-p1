import yup from 'yup'

export const gameCreateSchema = yup.object({
    name: yup.string().min(5).required(),
    description: yup.string().min(5).required(),
    gender: yup.string().min(4).required(),
    members: yup.array().of(yup.string()).required(),
    edition: yup.number().required(),
  });

export const gameUpdateSchema = yup.object({
    name: yup.string().min(5),
    description: yup.string().min(5),
    gender: yup.string().min(4),
    members: yup.array().of(yup.string()),
    edition: yup.number(),
  });
