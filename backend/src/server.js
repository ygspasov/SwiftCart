import express from 'express';
import bodyParser from 'body-parser';
import { mongoConnect } from './util/database.js';
import { router } from './routes/shop.js';

const app = express();

app.use(bodyParser.json());
app.use(router);

const port = process.env.PORT;
mongoConnect(() => {
  app.listen(port);
});
