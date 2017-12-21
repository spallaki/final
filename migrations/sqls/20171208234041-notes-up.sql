/* Replace with your SQL commands */
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  createdAt VARCHAR NOT NULL,
  noteBody VARCHAR NOT NULL,
  fk_prescription_id INT NOT NULL
);
