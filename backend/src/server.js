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
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const MongoDBStoreSession = MongoDBStore(session);
const port = process.env.PORT || 8000;
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0qq5jxd.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
const store = new MongoDBStoreSession({
  uri: MONGODB_URI,
  collection: 'sessions',
});

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/src/assets/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: null, // Session cookie will not expire due to inactivity
    },
  })
);
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
app.use(upload.single('image'));
app.use('/images', express.static('backend/src/assets/images'));
app.use('/invoices', express.static('backend/src/assets/invoices'));
app.use(shopRouter, adminRouter, authRouter);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../../../dist')));

// Fallback route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../dist', 'index.html'));
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(port);
  })
  .catch((err) => console.log(err));
