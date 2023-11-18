const express = require("express")
const auth = require("./routes/auth")
const Users = require("./routes/users")
const posts = require("./routes/posts")
const userRoute = Users.router;

const app = express()

app.use(express.json())
app.use("/auth", auth)
app.use("/users", userRoute)

app.use("/posts", posts)


app.get("/", (req, res) => {
    res.send("Hi I am here")
})

app.listen(5000, () => {
    console.log("Now running on port 5000")
})