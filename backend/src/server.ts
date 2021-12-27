import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import sequelize from "./utils/db";
import createAssociations from "./utils/associations";
import {authRouter, postRouter} from "./routes";
import "dotenv/config";
import {errorHandler} from "./middlewares";
import {userRouter} from "./routes/user.routes";
import {commentRouter} from "./routes/comment.routes";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use("/auth", authRouter);
app.use("/api", postRouter);
app.use("/api", userRouter);

app.get('/', (req, res) => {
  res.send('Well done!');
})

app.use(errorHandler);

createAssociations();

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`The application is listening on port ${process.env.PORT}!`);
  })
}).catch(err => {
  console.error(err)
})
