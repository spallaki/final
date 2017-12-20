/* Replace with your SQL commands */
CREATE TABLE reminders (
  id SERIAL PRIMARY KEY,
  day VARCHAR NOT NULL,
  set_time TIME NOT NULL,
  fk_prescription_id INT NOT NULL
);
