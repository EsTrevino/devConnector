const express = require('express');
const router = express.Router();
const db = require('../models/index');
const User = db.User;
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const jwtSecret = config.jwtSecret;

router.get('/', (req, res) => {
  res.status(200).json({ message: 'user routes work' });
});

//register route
router.get('/register', (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email }).then(user => {
    if (user) {
      res
        .status(400)
        .json({ message: 'Account with this email already exists' });
    } else {
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      const newUser = new User({
        name: name,
        email: email,
        avatar: avatar,
        password: password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          newUser
            .save()
            .then(user => {
              res
                .status(200)
                .json({ message: 'user created successfully', user: user });
            })
            .catch(err => {
              res
                .status(400)
                .json({ error: err, message: 'problem saving user to db' });
            });
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then(user => {
    if (!user) {
      res.status(404).json({ message: 'User email not found' });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name, avatar: user.avatar };

          jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res
              .status(200)
              .json({ message: 'login successful', token: 'Bearer' + token });
          });
        } else {
          res.status(400).json({ message: 'Password not valid' });
        }
      });
    }
  });
});

module.exports = router;
