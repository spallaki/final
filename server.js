const path = require('path');
const express = require('express');
const app = express();

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const auth = require('./backend/auth');
const routes = require('./backened/routes');
const db = require('./pool.js');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: process.env.SECRET || 'h0r1z0n5'}))

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html'); // For React/Redux
// });

//Passport
passport.serializeUser(function(user, done) {
  done(null, user.id)
});

passport.deserializeUser(function(id, done) {
  db.query('SELECT * FROM users WHERE id = $1', [id])
    .then((result) => {
      if(result.rows.length > 0) {
        done(null, result.rows[0])
      } else {
        done(null, null)
      }
    })
    .catch((err) => done(err))
});

passport.use(new LocalStrategy(function(username, password, done) {
  db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password])
    .then((result) => {
      if(result.rows.length === 0) {
        done(null, false, { message: 'Incorrect username.' });
      } else if(result.rows[0].password !== password) {
        done(null, false, { message: 'Incorrect password.'});
      } else {
        done(null, result.rows[0])
      }
    })
    .catch((err) => done(err))
}));

app.use(passport.initialize());
app.use(passport.session());

//pass them into auth(passport, db) & routes(db)
app.use('/', auth(passport, db));
app.use('/', routes(db));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, error =>
	error
  ? console.error(error)
  : console.info(`==> 🌎 Listening🌎`)
);
