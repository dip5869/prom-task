const mongoose = require('mongoose');
const loginSchema = new mongoose.Schema({
    user_name: String,
    password: String
});
module.exports = mongoose.model('admin',loginSchema);