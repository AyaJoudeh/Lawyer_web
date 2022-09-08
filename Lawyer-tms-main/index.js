const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const users = require("./routes/users");
const cases = require("./routes/cases");
const sessions = require("./routes/sessions");
const render = require("./routes/render");
const path = require("path");
const uploadS3 = require("./config/multerS3");
const passport = require("passport");
const exSession = require("express-session");
const flash = require("express-flash");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());
app.use(exSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const MONGO_DB_URL = process.env.MONGO_DB_URL;
mongoose
    .connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("Connected to MongoDB..."))
    .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));


app.use("/", render);
app.use("/api/auth", uploadS3.single("profilePic"), auth);
app.use("/api/users", uploadS3.single("profilePic"), users);
app.use("/api/cases", uploadS3.array("files"), cases);
app.use("/api/sessions", sessions);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
    console.log(`listening on port ${ PORT }...`)
);