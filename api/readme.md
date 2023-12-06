# Rank Tracker Web App API

The Rank Tracker Web App API is a backend service that supports the Rank Tracker web application. It provides endpoints for managing users, games, connections, and user activity logs. The API is designed to facilitate user registration, tracking game ranks, managing connections between users, and logging user activity.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [API Endpoints](#api-endpoints)
- [Documentation](#documentation)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js and npm installed
- PostgreSQL database set up
- Clone this repository to your local machine

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up the PostgreSQL database .

### Usage

#### Running the Server

Run the following command to start the server:

    ```bash
    npm start
    The API will be accessible at http://localhost:3000.
    ```

#### API Endpoints

The API provides the following main endpoints:

- `/users`: User management
- `/games`: Game management
- `/connections`: Connection request management
- `/activity`: User activity log management

Refer to the API documentation for detailed information on available endpoints and their usage.

### Documentation

API documentation is generated using Swagger. Visit the /docs endpoint when the server is running to access the interactive Swagger documentation.

`http://localhost:3000/docs`

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).
