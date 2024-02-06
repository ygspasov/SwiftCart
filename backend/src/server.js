import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { mongoConnect } from './util/database.js';
import { router } from './routes/shop.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('src/assets/images'));
app.use(router);

const port = process.env.PORT || 8000;
mongoConnect(() => {
  app.listen(port);
});
