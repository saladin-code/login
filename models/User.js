const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    group: {
        type: String,
        enum: ['Admin', 'Moderator', 'User'],
        default: 'User'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
