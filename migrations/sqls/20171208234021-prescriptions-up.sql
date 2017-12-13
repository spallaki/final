/* Replace with your SQL commands */
CREATE TABLE prescriptions (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  physician VARCHAR,
  dosage VARCHAR,
  quantity VARCHAR,
  type VARCHAR,
  rx_number VARCHAR,
  refills VARCHAR,
  received DATE,
  expiration_date DATE,
  pharmacy VARCHAR,
  pharmacy_phone VARCHAR,
  fk_user_id INT NOT NULL
);
