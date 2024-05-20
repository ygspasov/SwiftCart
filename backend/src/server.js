import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import { shopRouter } from './routes/shop.js';
import { adminRouter } from './routes/admin.js';
import { authRouter } from './routes/auth.js';
import { User } from './models/user.js';
import { config } from 'dotenv';
config();

const app = express();
const MongoDBStoreSession = MongoDBStore(session);
const port = process.env.PORT || 8000;
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0qq5jxd.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
const store = new MongoDBStoreSession({
  uri: MONGODB_URI,
  collection: 'sessions',
});
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store }));
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('backend/src/assets/images'));
app.use(shopRouter, adminRouter, authRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
