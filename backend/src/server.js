import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { mongoConnect } from './util/database.js';
import { router } from './routes/shop.js';
import { adminRouter } from './routes/admin.js';
import { User } from './models/user.js';

const app = express();

app.use((req, res, next) => {
  User.findById('65f998a5f107ef962c815983')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('backend/src/assets/images'));
app.use(router, adminRouter);

const port = process.env.PORT || 8000;
mongoConnect(() => {
  app.listen(port);
});
