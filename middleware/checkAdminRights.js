const Users = require('../routes/users')
const { users } = Users.users

module.exports = async (req, res, next) => {
    const { email } = req.user;

    let matchedUser = users.find((user) => {
        if (user.email === email) {
            return user;
        }
    })
    if (matchedUser.group !== "Admin")
        return res.status(400).json({ 'msg': 'Sie haben keine Admin berechtigung.' });
    else
    {
        req.user = matchedUser;
        next();
    }
        



}