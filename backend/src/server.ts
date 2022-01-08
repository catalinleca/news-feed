import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
import sequelize from "./utils/db";
import createAssociations from "./utils/associations";
import {authRouter, companyRouter, postRouter, userRouter, commentRouter} from "./routes";
import "dotenv/config";
import {errorHandler} from "./middlewares";

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/auth", authRouter);
app.use("/api", postRouter);
app.use("/api", userRouter);
app.use("/api", commentRouter);
app.use("/api", companyRouter);

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
