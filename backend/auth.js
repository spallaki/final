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

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/main',
    failureRediret: '/login'
  }));

  router.post('/register', (req, res) => {
    db.query('SELECT * FROM users WHERE username = $1', [req.body.username])
      .then((result) => {
        if (result.rows.length > 0) {
          console.log('Error: Username already exists')
          res.redirect('/register')
        } else if (req.body.password !== req.body.password2) {
          console.log('Error: Passwords do not match')
        } else {
          db.query('INSERT INTO users (username, password, firstName, lastName, email) VALUES ($1, $2, $3, $4, $5)',
          [req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.email])
          .then(() => res.redirect('/login'))
        }
      })
      .catch((err) => res.send(err));
  })

  return router;
}
