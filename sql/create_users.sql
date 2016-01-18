-- PostgreSQL
-- create users table
CREATE TABLE users (
  name text,
  password text,
  email text,
  admin boolean
);

-- sample user
INSERT INTO users (
  name, 
  password, 
  email, 
  admin
)
VALUES (
  'Joe Shmo', 
  'password', 
  'joeshmo@example.com', 
  TRUE
);