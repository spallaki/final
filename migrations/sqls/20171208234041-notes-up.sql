/* Replace with your SQL commands */
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  createdAt DATE NOT NULL,
  noteBody VARCHAR NOT NULL,
  fk_prescription_id INT NOT NULL
);
