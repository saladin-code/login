const JWT = require('jsonwebtoken');
require('dotenv').config();
const payload = process.env.PAYLOAD_KEY;

module.exports = async (req, res, next) => {

    const token = req.header('x-auth-token');

    if (!token)
        return res.status(400).json({ 'msg': 'Kein Token vorhanden' });
    else {
        try {
            let user = await JWT.verify(token, payload)
            req.user = user;
            next();
        } catch (error) {
            return res.status(400).json({ 'msg': 'Token ungültig' });
        }
    }


}