require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT;

const mongoose = require('mongoose');
const mongodb_uri = process.env.MONGODB_URI;
mongoose.connect(mongodb_uri);

// Routes
const auth = require("./routes/auth");
const user = require("./routes/user");
// const posts = require("./routes/posts");

app.use(express.json());
app.use("/auth", auth);
app.use("/user", user);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}
);