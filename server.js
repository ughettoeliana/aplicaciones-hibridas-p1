import express, { json } from "express";
import router from './routes/router.js'
const app = express();
app.use(express.json());
app.use(router);


app.listen(3000, function () {
   console.log("El servidor está levantado: http://localhost:3000/");
});
