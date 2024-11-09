// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountType: { type: String, enum: ['staff', 'customer'], required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
