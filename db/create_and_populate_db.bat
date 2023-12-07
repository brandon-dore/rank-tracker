@echo off

rem PostgreSQL database connection parameters
set DB_USER=postgres
set DB_HOST=localhost
set DB_NAME=rank_tracker_db
set PGPASSWORD=password
set DB_PORT=5432

rem Path to the SQL scripts
set CREATE_SCRIPT=create_tables.sql
set POPULATE_SCRIPT=populate_data.sql

rem Function to create database, and execute the SQL scripts

rem Terminate connections to the database
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '%DB_NAME%' AND pid <> pg_backend_pid();"

rem Drop the database if it already exists
dropdb -h %DB_HOST% -p %DB_PORT% -U %DB_USER% %DB_NAME%

rem Create the database
createdb -h %DB_HOST% -p %DB_PORT% -U %DB_USER% %DB_NAME%

rem Execute the SQL scripts
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f %CREATE_SCRIPT%
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f %POPULATE_SCRIPT%

rem Exit the script 
exit /b
