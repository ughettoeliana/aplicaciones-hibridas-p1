import yup from 'yup'

const judgeSchema = yup.object({
    name: yup.string().min(5).required(),
  });

  export { judgeSchema};
  export default{ judgeSchema};