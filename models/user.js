const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  firstName: String,
  lastName: String,
  gender: String,
  birthYear: Number
});

const User = mongoose.model('users', UserSchema);

module.exports = {
  Schema: UserSchema,
  User
};