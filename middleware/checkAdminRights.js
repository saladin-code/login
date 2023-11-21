const User = require("../models/User");

module.exports = async (req, res, next) => {
    const { email } = req.user;

    const matchedUser = await User.findOne({ email });
    if (matchedUser.group !== "Admin")
        return res.status(400).json({ 'msg': 'Sie haben keine Admin berechtigung.' });
    else
        next();





}