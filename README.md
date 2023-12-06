# Rank Tracker Web App

Welcome to the Rank Tracker Web App repository! This web application allows users to track their daily rank in a variety of video games. You can compare your rank over time, see how you stack up against friends, and even compete globally. Each game has its own stylized page for a truly immersive rank tracking experience.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Frontend:**

  - Built with React and Redux
  - Developed using Vite for fast and efficient development

- **Backend:**

  - Powered by Node.js and Express for a robust server
  - Manages the data flow and interactions with the database

- **Database:**
  - PostgreSQL used as the database to store rank data
  - SQL scripts provided for database setup and maintenance

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/brandon-dore/rank-tracker.git
   cd rank-tracker
   ```

2. **Install dependencies:**

   ```bash
   # Install frontend dependencies
   cd ui
   npm i

   # Install backend dependencies
   cd ../api
   npm i
   ```

3. **Database setup:**

   - Install PostgreSQL database, update the connection details in the configuration and run the scripts.
   - Further instructions are provided in the [README](./db/README.md)

4. **Run the application:**

   ```bash
   # Run frontend
   cd ../ui
   npm start

   # Run backend
   cd ../api
   npm start
   ```

5. **Access the application:**
   - Open your browser and navigate to `http://localhost:3000` to use the Rank Tracker Web App.

## Features

- **Daily Rank Tracking:**

  - Monitor your daily ranks in various video games.

- **Historical Data:**

  - Compare your rank over time to visualize your progress.

- **Global and Friend Comparisons:**

  - Compete with others globally or compare ranks with friends.

- **Game-Specific Pages:**

  - Enjoy a unique and stylized page for each tracked game.

## Contributing

We don't currently welcome contributions but will in futture! If you'd like to contribute please contact the developers.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).

Happy rank tracking! 🎮📈
