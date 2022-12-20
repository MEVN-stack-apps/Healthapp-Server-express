const express = require('express');
const router = express.Router();
const { User } = require('./../models/user');
const jwt = require('jsonwebtoken');

// middleware
function authenticated(req, res, next) {
  const header = req.get('Authorization') ?? '';
  const noAuth = { err: 'Invalid Token', noAuth: true };

  if (header.toLowerCase().indexOf('bearer') === -1) {
    return res.status(401).send(noAuth);
  }

  const token = header.split(' ')[1];

  if (!token) {
    return res.status(401).send(noAuth);
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    // error
    if (err) return res.status(401).send(noAuth);

    // valid token
    User.findById(decoded.id, (err, user) => {
      // err // no user
      if (err || !user) return res.status(401).send(noAuth);

      // user
      req.readerUser = user;
      next();
    });
  });
}

router.get('/profile', authenticated, (req, res) => {
  res.send({ "msg": "in profile route" });
});

router.post('/profile', authenticated, (req, res) => {
  const { firstName, lastName, gender, yearOfBirth } = req.body;
  const user = req.user;

  if (!firstName || !lastName || !gender || !yearOfBirth) {
    return res.status(422).send({
      err: 'Please fill the fields'
    });
  }

  user.profile.push({
    firstName, lastName, gender, yearOfBirth
  });
  user.firstName = firstName;

  user.save();

  res.send({ profile: user.profile });
});

module.exports = router;



