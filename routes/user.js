require('dotenv').config();

const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const User = require("../models/User");

const JWT = require("jsonwebtoken");
const payload = process.env.PAYLOAD_KEY;
const bcrypt = require("bcrypt");

const checkAuth = require("../middleware/checkAuth");
const checkAdminRights = require("../middleware/checkAdminRights");

router.get('/all', checkAuth, checkAdminRights, async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch {
    return res.status(500).json({ errors: [{ "msg": "Fehler beim Zugriff auf die Datenbank" }] });
  }
});

router.get('/add', [
  check("email", "Geben Sie bitte eine valide email adresse an!").trim().isEmail(),
  check("password", "Geben Sie bitte ein valides password an!").trim()
    .isLength({ min: 12 }).withMessage('Passwort muss mindestens 12 Zeichen lang sein.')
    .matches(/[a-z]/).withMessage('Passwort muss mindestens einen Kleinbuchstaben enthalten.')
    .matches(/[A-Z]/).withMessage('Passwort muss mindestens einen Grossbuchstaben enthalten.')
    .matches(/[0-9]/).withMessage('Passwort muss mindestens eine Zahl enthalten.')
    .matches(/[^a-zA-Z0-9]/).withMessage('Passwort muss mindestens ein Sonderzeichen enthalten.'),
], checkAuth, checkAdminRights, async (req, res) => {
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

router.delete('/delete/:id', checkAuth, checkAdminRights, async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      return res.status(200).json({ "msg": "User wurde erfolgreich gelöscht!", deletedUser });
    } else {
      return res.status(400).json({ errors: [{ "msg": "User existiert nicht!" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: [{ "msg": "Fehler beim löschen des Benutzers aus der Datenbank" }] });
  }
});

router.put('/update/:id', checkAuth, checkAdminRights, async (req, res) => {
  const userId = req.params.id;
  const { email, password, group } = req.body;

  if (!email && !password && !group) {
    return res.status(400).json({ errors: [{ "msg": "Bitte geben Sie mindestens ein Feld an, das Sie ändern möchten!" }] });
  }

  if (email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ errors: [{ "msg": "Email Adresse ist breits vergeben!" }] });
    }
  }

  if (group) {
    if (group !== "Admin" && group !== "Moderator" && group !== "Student") {
      return res.status(400).json({ errors: [{ "msg": "Gruppe muss entweder Admin oder Moderator oder Student sein!" }] });
    }
  }

  try {
    let updateUser = null;
    if (password != undefined) {
      const hashedpassword = await bcrypt.hash(password, 10);
      updateUser = await User.findByIdAndUpdate(userId, { email, password: hashedpassword, group }, { new: true });
    }
    else
      updateUser = await User.findByIdAndUpdate(userId, { email, group }, { new: true });

    if (updateUser) {
      return res.status(200).json({ "msg": "User update erfolgreich!", updateUser });
    } else {
      return res.status(400).json({ errors: [{ "msg": "User existiert nicht!" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: [{ "msg": "Fehler beim update des Benutzers in der Datenbank" }] });
  }
});

module.exports = router;

