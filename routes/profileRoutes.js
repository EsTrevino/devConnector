const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const db = require('../models/index');
const Profile = db.Profile;
const User = db.User;
const validateProfileInput = require('../validation/profile');

//protected route to get current user profile
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('User', [name, avatar])
      .then(profile => {
        if (!profile) {
          errors.noProfile = 'No profile for this user found';
          res.status(400).json(errors);
        } else {
          res.status(200).json(profile);
        }
      })
      .catch(err => {
        error.errorOnUserFind = err.message;
        res.status(404).json(errors);
      });
  }
);

//protected route to create a profile or edit a profile
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.social = {};

    //string fields of profile object
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    //skills field of profile object
    if (typeof req.body.skills !== undefined) {
      profileFields.skills = req.body.skills.split(',');
    }

    //social nested object
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      //update if already exists
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(updatedProfile => {
          res.status(200).json(updatedProfile);
        });
      } else {
        //create if does not
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'This handle already exists';
            res.status(400).json(errors);
          } else {
            new Profile(profileFields).save().then(savedProfile => {
              status(200).json(savedProfile);
            });
          }
        });
      }
    });
  }
);

module.exports = router;
