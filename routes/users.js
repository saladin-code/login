const router = require("express").Router()
const User  = require("../models/User")

// const checkAuth = require("../middleware/checkAuth")
// const checkAdmin = require("../middleware/checkAdmin")

// router.get("/all", (req, res) => {
//     res.json(User)
// })

// erstelle mir eine route um einen user zu löschen
// router.delete("/delete", checkAuth, checkAdmin, async (req, res) => {
//     const { email } = req.body

//     //Validiert ob ein user bereits existiert

//     let user = users.find((user) => {
//         return user.email === email
//     })

//     if (!user) {
//         res.status(400).json({
//             errors: [
//                 {
//                     "msg": "Email Adresse ist breits vergeben!",
//                 }
//             ]
//         })
//     }
//     else {
//         users = users.filter((user) => {
//             return user.email !== email
//         })

//         res.json({
//             "msg": "User wurde erfolgreich gelöscht!",
//         })
//     }
// })

// erstelle mir eine route um eine user zu updaten
// router.put("/update", checkAuth, checkAdmin, async (req, res) => {
//     const { email, newemail, newpassword } = req.body

//     //Validiert ob ein user bereits existiert

//     let user = users.find((user) => {
//         return user.email === email
//     })

//     if (!user) {
//         res.status(400).json({
//             errors: [
//                 {
//                     "msg": "Email Adresse ist breits vergeben!",
//                 }
//             ]
//         })
//     }
//     else {
//         let hasdedpassword = await bcrypt.hash(newpassword, 10);

//         users = users.map((user) => {
//             if (user.email === email) {
//                 return {
//                     email: newemail,
//                     password: hasdedpassword
//                 }
//             }
//             else {
//                 return user
//             }
//         })

//         res.json({
//             "msg": "User wurde erfolgreich geupdatet!",
//         })
//     }
// })


module.exports = {
    // router: router,
    // User: { User }
  };

