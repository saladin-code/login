const router = require("express").Router()
const { check, validationResult } = require("express-validator")
const Users = require('./users')
const { users } = Users.users
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
require('dotenv').config();

// Greife auf die Umgebungsvariablen zu
const payload = process.env.PAYLOAD_KEY;



router.post("/signup", [
    check("email", "Geben Sie bitte eine valide email adresse an!").isEmail(),
    check("password", "Geben Sie bitte ein valides password an!").isLength({ min: 6 }),
], async (req, res) => {
    const { password, email } = req.body

    //Validiert den Input falls er nicht valide ist wird ein error zurückgegeben
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })


    //Validiert ob ein user bereits existiert
    let user = users.find((user) => {
        return user.email === email
    })

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


router.post("/login", [
    check("email", "Geben Sie bitte eine valide email adresse an!").isEmail(),
    check("password", "Geben Sie bitte ein valides password an!").isLength({ min: 6 }),
], async (req, res) => {

    const { password, email } = req.body
    //Validiert den Input falls er nicht valide ist wird ein error zurückgegeben
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    let user = users.find((user) => {
        return user.email === email
    })

    if (!user) {
        res.status(400).json({
            errors: [
                {
                    "msg": "Invalid Credentials!",
                }
            ]
        })
    }
    else {

        let isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            res.status(400).json({
                errors: [
                    {

                        "msg": "Login fehlgeschlagen!",
                    }
                ]
            })
        }
        else {
            const token = await JWT.sign({
                email
            }, payload, {
                expiresIn: "24h"
            })

            res.json({
                "msg": "User wurde erfolgreich eingeloggt!",
                token
            })
        }

    }


})





// erstelle mir eine route um einen user zu löschen
router.delete("/delete", async (req, res) => {
    const { email } = req.body

    //Validiert ob ein user bereits existiert

    let user = users.find((user) => {
        return user.email === email
    })

    if (!user) {
        res.status(400).json({
            errors: [
                {
                    "msg": "Email Adresse ist breits vergeben!",
                }
            ]
        })
    }
    else {
        users = users.filter((user) => {
            return user.email !== email
        })

        res.json({
            "msg": "User wurde erfolgreich gelöscht!",
        })
    }
})

// erstelle mir eine route um eine user zu updaten
router.put("/update", async (req, res) => {
    const { email, newemail, newpassword } = req.body

    //Validiert ob ein user bereits existiert

    let user = users.find((user) => {
        return user.email === email
    })

    if (!user) {
        res.status(400).json({
            errors: [
                {
                    "msg": "Email Adresse ist breits vergeben!",
                }
            ]
        })
    }
    else {
        let hasdedpassword = await bcrypt.hash(newpassword, 10);

        users = users.map((user) => {
            if (user.email === email) {
                return {
                    email: newemail,
                    password: hasdedpassword
                }
            }
            else {
                return user
            }
        })

        res.json({
            "msg": "User wurde erfolgreich geupdatet!",
        })
    }
})

module.exports = router