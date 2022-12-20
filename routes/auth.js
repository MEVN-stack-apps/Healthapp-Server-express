const express = require('express');
const router = express.Router();
const { User } = require('./../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  const { email, password } = req.body;

  // if req.body empty
  if (!email || !password) {
    return res.status(422).send({
      err: 'Please supply email and password'
    });
  }

  // TODO: If email taken 
  // const duplicateUser = User.findOne({ email });
  // console.log("duplicateUser:", duplicateUser);
  // if (duplicateUser) return res.status(400).send({
  //   err: 'Something went wrong!!!'
  // });

  // if new user email
  bcrypt.hash(password, 8, (err, hash) => {
    User.create({
      email,
      password: hash,
      profile: {
        firstName: '',
        lastName: '',
        gender: '',
        yearOfBirth: ''
      }
    }, (err, user) => {
      if (err) return res.status(400).send(err);

      let token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn: 86400 }
      );

      return res.send({ token });
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({
      err: 'Please add email and/or password'
    });
  }

  // To find one user 3 things can happen, 
  // we can get an err
  // or we can find the user
  // or we can not find the user

  User.findOne({ email }, (err, user) => {
    if (err) return res.status(404).send({ err: "Something went wrong" });
    if (!user) return res.status(401).send({ err: "the user name and/or password is incorrect!" });

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(400).send(err);
      if (!result) {
        return res.status(401).send({ err: "The username and/or password is incorrect!" });
      }
      let token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn: 86400 }
      );
      return res.send({ token });
    });
  });
});

module.exports = router;