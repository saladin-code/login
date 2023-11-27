require('dotenv').config();

const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const User = require("../models/User");

const JWT = require("jsonwebtoken");
const payload = process.env.PAYLOAD_KEY;
const bcrypt = require("bcrypt");

router.post("/signup", [
    check("email", "Geben Sie bitte eine valide email adresse an!").trim().isEmail(),
    check("password", "Geben Sie bitte ein valides password an!").trim()
        .isLength({ min: 10 }).withMessage('Passwort muss mindestens 10 Zeichen lang sein.')
        .matches(/[a-z]/).withMessage('Passwort muss mindestens einen Kleinbuchstaben enthalten.')
        .matches(/[A-Z]/).withMessage('Passwort muss mindestens einen Grossbuchstaben enthalten.')
        .matches(/[0-9]/).withMessage('Passwort muss mindestens eine Zahl enthalten.')
        .matches(/[^a-zA-Z0-9]/).withMessage('Passwort muss mindestens ein Sonderzeichen enthalten.'),
],
    async (req, res) => {
        const { password, email } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ errors: [{ "msg": "Email Adresse ist breits vergeben!" }] });
            }
            else {
                let hasdedpassword = await bcrypt.hash(password, 10);
                const token = await JWT.sign({ email }, payload, { expiresIn: "24h" });
                const newUser = await User.create({ email, "password": hasdedpassword });
                return res.status(201).json({ "msg": "User wurde erfolgreich erstellt!", "x-auth-token": token });
            }
        } catch {
            return res.status(500).json({ errors: [{ "msg": "Fehler beim Speichern des Benutzers in der Datenbank" }] });
        }
    });

router.post("/login", [
    check("email", "Geben Sie bitte eine valide email adresse an!").trim().isEmail(),
    check("password", "Geben Sie bitte ein valides password an!").trim().isLength({ min: 12 }),
], async (req, res) => {

    const { password, email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ "msg": "Ungültige Anmeldeinformationen!" }] });
        }
        else {
            let isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched)
                return res.status(400).json({ errors: [{ "msg": "Ungültige Anmeldeinformationen!" }] });
            else {
                const token = await JWT.sign({ email }, payload, { expiresIn: "24h" });
                return res.status(200).json({ "msg": "User wurde erfolgreich eingeloggt", "x-auth-token": token });
            }
        }
    } catch {
        return res.status(400).json({ errors: [{ "msg": "Fehler beim Login!" }] });
    }
});

module.exports = router;