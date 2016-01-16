-- PostgreSQL 
-- table hinh_heatlog
-- first create the table in CartoDB as an empty dataset.
ALTER TABLE hinh_heatlog
  ADD COLUMN username text,
  ADD COLUMN complaint_number text,
  ADD COLUMN datetime date,
  ADD COLUMN outdoor_temp numeric,
  ADD COLUMN indoor_temp numeric,
  ADD COLUMN water boolean,
  ADD COLUMN witness text;