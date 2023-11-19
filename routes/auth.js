const express = require("express")
const router = express.Router()

const { check, validationResult } = require("express-validator")

const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

// const Users = require('./users')
// const { users } = Users.users

const User = require('../models/User')

require('dotenv').config();

const payload = process.env.PAYLOAD_KEY;

router.post("/signup", [
    check("email", "Geben Sie bitte eine valide email adresse an!").trim().isEmail(),
    check("password", "Geben Sie bitte ein valides password an!").trim()
    .isLength({ min: 12 }).withMessage('Passwort muss mindestens 12 Zeichen lang sein.')
    .matches(/[a-z]/).withMessage('Passwort muss mindestens einen Kleinbuchstaben enthalten.')
    .matches(/[A-Z]/).withMessage('Passwort muss mindestens einen Grossbuchstaben enthalten.')
    .matches(/[0-9]/).withMessage('Passwort muss mindestens eine Zahl enthalten.')
    .matches(/[^a-zA-Z0-9]/).withMessage('Passwort muss mindestens ein Sonderzeichen enthalten.'),
], 
async (req, res) => {
    const { password, email } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

        // res.json({
        //     "msg": "Test!",
        //     "email": password
        // })

    let user = User.find({ email }).then(result => {
        console.log(result)
        return result
    }).catch(err => {
        console.log(err)
        res.json({ "msg": "Fehler beim erstellen des Users!" })
    })
    console.log(user)
    res.json({
        "msg": "Test!",
        "user": user
    })

    return
    if (user)
        res.status(400).json({ errors: [{ "msg": "Email Adresse ist breits vergeben!" }] })
    else {
        let hasdedpassword = await bcrypt.hash(password, 10);

        const token = await JWT.sign({
            email
        }, payload, {
            expiresIn: "24h"
        })


        users.push({
            email,
            password: hasdedpassword
        })


        res.json({
            "msg": "User wurde erfolgreich erstellt!",
            token
        })
    }
})


// router.post("/login", [
//     check("email", "Geben Sie bitte eine valide email adresse an!").isEmail(),
//     check("password", "Geben Sie bitte ein valides password an!").isLength({ min: 6 }),
// ], async (req, res) => {

//     const { password, email } = req.body
//     //Validiert den Input falls er nicht valide ist wird ein error zurückgegeben
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             errors: errors.array()
//         })
//     }

//     let user = users.find((user) => {
//         return user.email === email
//     })

//     if (!user) {
//         res.status(400).json({
//             errors: [
//                 {
//                     "msg": "Invalid Credentials!",
//                 }
//             ]
//         })
//     }
//     else {

//         let isMatched = await bcrypt.compare(password, user.password);

//         if (!isMatched) {
//             res.status(400).json({
//                 errors: [
//                     {

//                         "msg": "Login fehlgeschlagen!",
//                     }
//                 ]
//             })
//         }
//         else {
//             const token = await JWT.sign({
//                 email
//             }, payload, {
//                 expiresIn: "24h"
//             })

//             res.json({
//                 "msg": "User wurde erfolgreich eingeloggt!",
//                 token
//             })
//         }

//     }


// })







module.exports = router