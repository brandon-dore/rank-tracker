#!/bin/bash

# PostgreSQL database connection parameters
DB_USER=postgres
DB_HOST=localhost
DB_NAME=rank_tracker_db
PGPASSWORD=3391
DB_PORT=5432

# Path to the SQL scripts
CREATE_SCRIPT=create_tables.sql
POPULATE_SCRIPT=populate_data.sql

# Function to terminate connections to the database
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$DB_NAME' AND pid <> pg_backend_pid();"

# Drop the database if it already exists
dropdb -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME

# Create the database
createdb -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME

# Execute the SQL scripts
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f $CREATE_SCRIPT
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f $POPULATE_SCRIPT

# Exit the script
exit 0
