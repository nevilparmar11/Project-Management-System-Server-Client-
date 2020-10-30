const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    email: String,
    createdAt: String,
    updateAt: String,
    avatarUrl: String,
    password: String,
}, {
    collection: "users"
});

module.exports = mongoose.model('users', userSchema, 'users');