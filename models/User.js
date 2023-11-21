const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
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
        enum: ['Admin', 'Moderator', 'Student'],
        default: 'Student'
    }
});

const User = model('User', userSchema);

module.exports = User;
