
-- CREATE TABLE users (
--   username VARCHAR(25) PRIMARY KEY,
--   password TEXT NOT NULL,
--   first_name TEXT NOT NULL,
--   last_name TEXT NOT NULL,
--   email TEXT NOT NULL
--     CHECK (position('@' IN email) > 1), 
--   pref_unit TEXT NOT NULL
-- );

-- CREATE TABLE ingredients (
--   id Serial PRIMARY KEY,
--   name TEXT NOT NULL,
--   unit Text NOT NULL,
--   full_amount NUMERIC,
--   available_amount NUMERIC,
--   username VARCHAR(25) NOT NULL
--     REFERENCES users ON DELETE CASCADE
--   -- description TEXT NOT NULL,
--   -- logo_url TEXT
-- );

CREATE TABLE recipes (
  id Serial PRIMARY KEY,
  name TEXT NOT NULL,
  ingredients Text NOT NULL,
  username VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE
  -- description TEXT NOT NULL,
  -- logo_url TEXT
);







-- CREATE TABLE Pantry (
--   id SERIAL PRIMARY KEY,
--   user_name VARCHAR(25) NOT NULL
--     REFERENCES users ON DELETE CASCADE,
--   ingredient_handle Serial Not Null
--     REFERENCES ingredients ON DELETE CASCADE
-- );