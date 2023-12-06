# Rank Tracker Web App Database Initialization Script

## Overview

This script is designed for initializing the PostgreSQL database for the Rank Tracker web application. It creates necessary roles, a database, and executes SQL scripts to set up tables and populate initial data.

## Prerequisites

- [PostgreSQL](https://www.postgresql.org/download/)
- Ensure `psql` is added to PATH / Can be accessed globally
- [Bash](https://www.gnu.org/software/bash/) (For Windows: Use the provided `create_and_populate_script.bat`)

## Usage

1. **Modify Script:** Open the `create_and_populate_script.sh` (or `create_and_populate_script.bat` for Windows) file and replace the placeholder values with your actual PostgreSQL credentials and script filenames.

2. **Make Script Executable:**

   ```bash
   chmod +x create_and_populate_script.sh
   ```

   (Not applicable for Windows)

3. **Run Script:**

   ```bash
   ./create_and_populate_script.sh
   ```

   (For Windows: Run `create_and_populate_script.bat`)

4. **Verify Execution:**
   Check the console output for any errors. If the script runs successfully, your database should be initialized for the Rank Tracker web application.

## Notes

- Ensure [PostgreSQL](https://www.postgresql.org/docs/) is installed and running before executing the script.
- For Windows, use the provided `create_and_populate_script.bat` to execute the script directly (no need for WSL).
- Review and secure the script and credentials appropriately, especially in a production environment.
- Make sure to have the necessary SQL scripts (`create_tables.sql` and `populate_data.sql`) available in the correct paths.

## Contributors

- Brandon Dore
