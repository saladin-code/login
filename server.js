require("./db")
require('dotenv').config();
const express = require("express")
//Routes
const auth = require("./routes/auth")
// const users = require("./routes/users")
// const posts = require("./routes/posts")

const app = express()
const port = process.env.PORT
app.use(express.json())
app.use("/auth", auth)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}
);