-- PostgreSQL 
-- create heatlogs table
CREATE TABLE heatlogs (
  username text,
  complaint_number text,
  datetime date,
  outdoor_temp numeric,
  indoor_temp numeric,
  hot_water boolean,
  witness text
);

-- if using CartoDB as a database, first 
-- create the table in CartoDB as an empty dataset
ALTER TABLE heatlogs
  ADD COLUMN username text,
  ADD COLUMN complaint_number text,
  ADD COLUMN datetime date,
  ADD COLUMN outdoor_temp numeric,
  ADD COLUMN indoor_temp numeric,
  ADD COLUMN water boolean,
  ADD COLUMN witness text;