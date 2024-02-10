import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { mongoConnect } from './util/database.js';
import { router } from './routes/shop.js';
import { adminRouter } from './routes/admin.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('backend/src/assets/images'));
app.use(router, adminRouter);

const port = process.env.PORT || 8000;
mongoConnect(() => {
  app.listen(port);
});
