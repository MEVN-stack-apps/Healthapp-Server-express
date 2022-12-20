const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  profile: {
    type: Object,
    properties: {
      firstName: String,
      lastName: String,
      gender: String,
      yearOfBirth: String
    }
  }
});

const User = mongoose.model('users', UserSchema);

module.exports = {
  Schema: UserSchema,
  User
};