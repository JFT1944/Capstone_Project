\echo 'Delete and recreate dispensa db?'
\prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE dispensa;
-- CREATE DATABASE dispensa;
\connect dispensa

\i jobly-schema.sql
-- \i jobly-seed.sql

\echo 'Delete and recreate dispensa_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE dispensa_test;
-- CREATE DATABASE dispensa_test;
\connect dispensa_test

\i jobly-schema.sql
