const router = require("express").Router()
const { users } = require("../db")



router.get("/all", (req, res) => {
    res.json(users)
})


module.exports = {
    router: router,
    users: { users }
  };

