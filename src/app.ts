import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan"; // to get about response number
import { MORGAN_FORMAT } from "./libs/config";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";

const MongoDbStore = ConnectMongoDB(session);
const store = new MongoDbStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions", // collection_name in db
});

// 1.Entrance
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT)); //shows url info in console

// 2.Sessions
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 5, // 5h
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

// 3.Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 4.Routers
app.use("/admin", routerAdmin); // SSR: EJS
app.use("/", router); // SPA: React

export default app;
