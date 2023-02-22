const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        name: {
                type: String,
                required: true
        },
        email: {
                type: String,
                required: true
        },
        roles: {
                User: Number,
                Editor: Number,
                Admin: Number
        },
        password: {
                type: String,
                required: true
        },
        refreshToken: [String],
        registeredFrom: {
                type: String
        },
        isPasswordSet: {
                type: Boolean
        }
});

module.exports = mongoose.model('User', userSchema);