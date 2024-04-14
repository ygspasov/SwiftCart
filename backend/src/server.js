import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import { shopRouter } from './routes/shop.js';
import { adminRouter } from './routes/admin.js';
import { authRouter } from './routes/auth.js';
import { User } from './models/user.js';
import { config } from 'dotenv';
config();

const app = express();

app.use((req, res, next) => {
  User.findById('660de2ccb60c65ef1f9b0d47')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('backend/src/assets/images'));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false }));
app.use(shopRouter, adminRouter, authRouter);

const port = process.env.PORT || 8000;
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0qq5jxd.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Yavor',
          email: 'yavor@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(port);
  })
  .catch((err) => console.log(err));
