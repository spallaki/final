"use strict";
var express = require('express');
var router = express.Router();

module.exports = function(passport, db) {

  // router.get('/login', (req, res, next) => {
  //   res.render('login')
  // });
  //
  // router.get('/register', (req, res, next) => {
  //   res.render('register')
  // });

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        res.json({success: false, error: err})
      } else if (!user) {
        res.json({success: false, error: 'User not found'});
      } else {
        req.logIn(user, err => {
          if (err) {
            res.json({success: false, error: err})
          } else {
            res.json({success: true, user: user});
          };
        })
      }
    })(req, res, next);
  });

  // router.post('/login', passport.authenticate('local', {
  //   successRedirect: '/main',
  //   failureRediret: '/login'
  // }));

  router.post('/register', (req, res) => {
    console.log(req.body, 'register req body');
    db.query('SELECT * FROM users WHERE username = $1', [req.body.username])
      .then((result) => {
        console.log('succeeded firat query', result);
        if (result.rows.length > 0) {
          res.json({success: false, error: 'Username already exists'})
        } else if (req.body.password !== req.body.password2) {
          res.json({success: false, error: 'Passwords do not match'})
        } else {
          db.query('INSERT INTO users (username, password, firstName, lastName, email) VALUES ($1, $2, $3, $4, $5)',
          [req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.email])
          .then((result) => res.json({success: true, user: result}))
        }
      })
      .catch((error) => res.json({success: false, error: error}));
  })

  return router;
}
