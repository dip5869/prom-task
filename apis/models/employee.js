const mongoose = require('mongoose');
const loginSchema = new mongoose.Schema({
    name: String,
    salary: String
});
module.exports = mongoose.model('employee',loginSchema);