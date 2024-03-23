import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { mongoConnect } from './util/database.js';
import { router } from './routes/shop.js';
import { adminRouter } from './routes/admin.js';
import { User } from './models/user.js';

const app = express();

app.use((req, res, next) => {
  User.findById('65fe4ab3319c63747bd2536e')
    .then((user) => {
      req.user = new User(user.username, user.email, user.cart, user._id);
      console.log('req.user', req.user);
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
