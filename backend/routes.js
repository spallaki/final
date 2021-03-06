const express = require('express');
const router = express.Router();

module.exports = function(db) {

var colors = ['#EBADAD', '#ADD6EB', '#D3B8E0', '#FFEE99', '#B3E085']
var colorIndex = 0;
// router.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html'); // For React/Redux
// });

//sends all prescriptions that belong to a specific user
//id, name, physician, dosage, quantity, type, rx number, refills, received,
//expiration date, pharmacy, pharmacy phone, fk_user_id

router.post('/addPicture', (req, res) => {
  db.query(`UPDATE users
  SET profile_pic = $1
  WHERE id = $2`, [req.body.user_URI, req.user.id])
  .then((result) => res.json({success: true}))
  .catch((error) => res.json({success: false, error: error}))
})

router.post('/addRx', (req, res) => {
  console.log(req.body.name)
  var prescriptionName = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);
  // var physician = req.body.physician.charAt(0).toUpperCase() + req.body.name.slice(1);
  // var received = req.body.received || null;
  // var expiration_date = req.body.expiration_date || null;
  var color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;

  db.query(`INSERT INTO prescriptions
  (name, physician, dosage, quantity, type, rx_number, refills, received, expiration_date, pharmacy, pharmacy_phone, color, fk_user_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
  [prescriptionName, req.body.physician, req.body.dosage, req.body.quantity, req.body.type, req.body.rx_number, req.body.refills, req.body.received, req.body.expiration_date, req.body.pharmacy, req.body.pharmacy_phone, color, req.user.id])
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

  db.query(`INSERT INTO notes (createdAt, noteBody, fk_prescription_id)
  VALUES($1, $2, $3)`, [today, req.body.noteBody, req.body.id])
  .then((result) => res.json({success: true}))
  .catch((error) => res.json({success: false, error: error}))
});

router.post('/addReminder', (req, res) => {
  console.log('addReminder', req.body.day, req.body.set_time, req.body.id);
  db.query(`INSERT INTO reminders (day, set_time, fk_prescription_id)
  VALUES($1, $2, $3)`, [req.body.day, req.body.set_time, req.body.id])
  .then((result) => res.json({success: true}))
  .catch((error) => {
    console.log('error is here', error)
    res.json({success: false, error: error})
  })
});

router.post('/getAllRx', (req, res) => {
  db.query(`SELECT
    p.id, p.name, p.physician, p.dosage, p.quantity, p.type, p.rx_number, p.refills, p.received, p.expiration_date,
    p.pharmacy, p.pharmacy_phone, n.createdAt, n.noteBody, r.day, r.set_time, p.color
    FROM prescriptions p
    LEFT JOIN notes n ON (p.id = n.fk_prescription_id)
    LEFT JOIN reminders r ON (p.id = r.fk_prescription_id)
    WHERE fk_user_id = $1`,
    [req.user.id])
  .then((result) => {
    var prescriptionsObject = {};

    result.rows.forEach((presc) => {
      if (prescriptionsObject.hasOwnProperty(presc.id)) {
        var currentPrescription = prescriptionsObject[presc.id]
        var prescriptionNotes = currentPrescription.notes
        if (presc.createdat && presc.notebody) {
          prescriptionNotes.push({createdAt: presc.createdat, noteBody: presc.notebody})
        }
      } else {
        var notes = [];
        if (presc.createdat && presc.notebody) {
          notes.push({createdAt: presc.createdat, noteBody: presc.notebody})
        }
        prescriptionsObject[presc.id] = {
          id: presc.id,
          name: presc.name,
          physician: presc.physician,
          dosage: presc.dosage,
          quantity: presc.quantity,
          type: presc.type,
          rx_number: presc.rx_number,
          refills: presc.refills,
          received: presc.received,
          expiration_date: presc.expiration_date,
          pharmacy: presc.pharmacy,
          pharmacy_phone: presc.pharmacy_phone,
          day: presc.day,
          time: presc.set_time,
          color: presc.color,
          notes: notes
        }
      }
    })
    res.json({success: true, result: Object.values(prescriptionsObject)})
  })
  .catch((error) => { console.log(error)
    res.json({success: false, error: error}) })
  // console.log(req.user)
});

router.get('/getMedSched', (req, res) => {
   db.query(`SELECT
     r.day, r.set_time, p.id "prescID", p.name, u.id "userID", p.color
     FROM reminders r
     JOIN prescriptions p on r.fk_prescription_id = p.id
     JOIN users u on u.id = p.fk_user_id
     WHERE u.id = $1`, [req.user.id])
  .then((result) => {
    var dayObject = {};
    result.rows.forEach((reminder) => {
      if (reminder.day === 'Monday') {
        if (dayObject['0']) {
          dayObject['0'].push({name: reminder.name, color: reminder.color})
        } else {
          dayObject['0'] = [{name: reminder.name, color: reminder.color}]
        }
      }
      if (reminder.day === 'Tuesday') {
        if (dayObject['1']) {
          dayObject['1'].push({name: reminder.name, color: reminder.color})
        } else {
          dayObject['1'] = [{name: reminder.name, color: reminder.color}]
        }
      }
      if (reminder.day === 'Wednesday') {
        if (dayObject['2']) {
          dayObject['2'].push({name: reminder.name, color: reminder.color})
        } else {
          dayObject['2'] = [{name: reminder.name, color: reminder.color}]
        }
      }
      if (reminder.day === 'Thursday') {
        if (dayObject['3']) {
          dayObject['3'].push({name: reminder.name, color: reminder.color})
        } else {
          dayObject['3'] = [{name: reminder.name, color: reminder.color}]
        }
      }
      if (reminder.day === 'Friday') {
        if (dayObject['4']) {
          dayObject['4'].push({name: reminder.name, color: reminder.color})
        } else {
          dayObject['4'] = [{name: reminder.name, color: reminder.color}]
        }
      }
      if (reminder.day === 'Saturday') {
        if (dayObject['5']) {
          dayObject['5'].push({name: reminder.name, color: reminder.color})
        } else {
          dayObject['5'] = [{name: reminder.name, color: reminder.color}]
        }
      }
      if (reminder.day === 'Sunday') {
        if (dayObject['6']) {
          dayObject['6'].push({name: reminder.name, color: reminder.color})
        } else {
          dayObject['6'] = [{name: reminder.name, color: reminder.color}]
        }
      }
    })
    res.json({success: true, result: dayObject})
   })
  .catch((error) => res.json({success: false, error: error}))
})

// router.post('/getRx/:id', (req, res) => {
//   db.query(`SELECT
//   *
//   FROM prescriptions
//   WHERE id = $1`, [req.body.id])
//   .then((result) => res.json({success: true, result: result.rows}))
//   .catch((error) => res.json({success: false, error: error}))
//   //front end gets all the prescription information, including the id and can access it in the state
//   //once you click on the prescription, it can access the id and will use the /getrx/:id route
// });

router.post('/getProfile', (req, res) => {
  db.query(`SELECT
  firstName, lastName, profile_pic
  FROM users WHERE id=$1`, [req.user.id])
  .then((result) => res.json({success: true, result: result.rows}))
  .catch((error) => res.json({success: false, error: error}))
})

router.post('/day', (req, res) => {
  db.query(`SELECT
  p.name, r.day, r.set_time
  FROM prescriptions p
  JOIN users u on p.fk_user_id = u.id
  JOIN reminders r on r.fk_prescription_id = p.id
  WHERE p.fk_user_id = $1`, [req.user.id])
  .then((result) => res.json({success: true, result: result.rows}))
  .catch((error) => res.json({success: false, error: error}))
});

router.post('/updateRx', (req, res) => {
  //check what req.body has
  //if req.body has something new, it'll update particular parts
  //switch statement
  // var physician = req.body.physician.charAt(0).toUpperCase() + req.body.name.slice(1);
  var received = req.body.received || null;
  var expiration_date = req.body.expiration_date || null;

  db.query(`UPDATE prescriptions
  SET physician = $1, dosage = $2, quantity = $3, type = $4, rx_number = $5, refills = $6, received = $7,
  expiration_date = $8, pharmacy = $9, pharmacy_phone = $10
  WHERE id = $11`, [req.body.physician, req.body.dosage, req.body.quantity, req.body.type,
  req.body.rx_number, req.body.refills, received, expiration_date, req.body.pharmacy, req.body.pharmacy_phone,
  req.body.id])
  .then((result) => res.json({success: true, result: result}))
  .catch((error) => res.json({success: false, error: error}))
})

router.post('/updateNote', (req, res) => {
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

  db.query(`UPDATE notes
  SET createdAt = $1, noteBody = $2
  WHERE id = $3`, [today, req.body.noteBody, req.params.id])
  .then((result) => res.json({success: true, result: result}))
  .catch((error) => res.json({success: false, error: error}))
})

router.post('/updateReminder', (req, res) => {
  db.query(`UPDATE reminders
  SET day = $1, set_time = $2
  WHERE fk_prescription_id = $3`, [req.body.day, req.body.set_time, req.body.id])
  .then((result) => res.json({success: true, result: result}))
  .catch((error) => res.json({success: false, error: error}))
})

return router;
}
