const express = require('express');
const router = express.Router();

module.exports = function(db) {

// router.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html'); // For React/Redux
// });

//sends all prescriptions that belong to a specific user
//id, name, physician, dosage, quantity, type, rx number, refills, received,
//expiration date, pharmacy, pharmacy phone, fk_user_id

router.post('/addPicture', (req, res) => {
  db.query('UPDATE users SET profile_pic = $1 WHERE id = $2', [req.body.user_URI, req.user.id])
  .then((result) => res.json({success: true}))
  .catch((error) => res.json({success: false, error: error}))
})

router.post('/addRx', (req, res) => {
  var prescriptionName = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
  // var physician = req.body.physician.charAt(0).toUpperCase() + req.body.name.slice(1);
  var received = req.body.received || null;
  var expiration_date = req.body.expiration_date || null;
  db.query('INSERT INTO prescriptions (name, physician, dosage, quantity, type, rx_number, refills, received, expiration_date, pharmacy, pharmacy_phone, fk_user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
  [prescriptionName, req.body.physician, req.body.dosage, req.body.quantity, req.body.type, req.body.rx_number, req.body.refills, received, expiration_date, req.body.pharmacy, req.body.pharmacy_phone, req.user.id])
  .then((result) => res.json({success: true}))
  .catch((error) => {
    console.log("the error here", error);
    res.json({success: false, error: error})
  })
})

router.post('/addNote', (req, res) => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd='0'+dd
  }
  if(mm<10) {
    mm='0'+mm
  }
  today = mm + '/' + dd + '/' + yyyy;

  db.query('INSERT INTO notes VALUES($1, $2, $3),' [today, req.body.noteBody, req.body.id])
  .then((result) => res.json({success: true}))
  .catch((error) => res.json({success: false, error: error}))
});

router.post('/getAllRx', (req, res) => {
  db.query(`SELECT
      *
    FROM prescriptions p
    LEFT JOIN notes n ON (p.id = n.fk_prescription_id)
    WHERE fk_user_id = $1`,
    [req.user.id])
  .then((result) => res.json({success: true, result: result.rows}))
  .catch((error) => res.json({success: false, error: error}))
  // console.log(req.user)
});

router.post('/getRx/:id', (req, res) => {
  db.query('SELECT * FROM prescriptions WHERE id = $1', [req.params.id])
  .then((result) => res.json({success: true, result: result.rows}))
  .catch((error) => res.json({success: false, error: error}))
  //front end gets all the prescription information, including the id and can access it in the state
  //once you click on the prescription, it can access the id and will use the /getrx/:id route
});

router.post('/getProfile', (req, res) => {
  db.query('SELECT firstName, lastName, profile_pic FROM users WHERE id=$1', [req.user.id])
  .then((result) => res.json({success: true, result: result.rows}))
  .catch((error) => res.json({success: false, error: error}))
})

router.post('/day', (req, res) => {
  db.query('SELECT p.name, r.day, r.set_time FROM prescriptions p JOIN users u on p.fk_user_id = u.id JOIN reminders r on r.fk_prescription_id = p.id WHERE p.fk_user_id = $1', [req.user.id])
  .then((result) => res.json({success: true, result: result.rows}))
  .catch((error) => res.json({success: false, error: error}))
});

router.post('/updateRx', (req, res) => {
  //check what req.body has
  //if req.body has something new, it'll update particular parts
  //switch statement
})

router.post('/updateNote', (req, res) => {

})

return router;
}
