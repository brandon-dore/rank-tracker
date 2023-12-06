-- Table to store user information
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(64) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    profile_picture_url VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store game information
CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    game_name VARCHAR(50) NOT NULL UNIQUE,
    rank_format VARCHAR(50) NOT NULL, -- 'numeric' or 'text'
    rank_range_low INT, -- For numeric ranks, e.g., lowest rank
    rank_range_high INT, -- For numeric ranks, e.g., highest rank
    rank_types VARCHAR(255)[] -- For text-based ranks, e.g., ['Gold', 'Silver', ...]
);

-- Table to store daily user ranks for each game
CREATE TABLE user_ranks (
    rank_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    game_id INT REFERENCES games(game_id), -- Reference to the games table
    text_rank VARCHAR(50), -- For text-based ranks like "Gold 1" or "Gold"
    numeric_rank INT, -- For games like CS:GO
    rank_date DATE NOT NULL
);


-- Table to store friendship or connection requests
CREATE TABLE connection_requests (
    request_id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(user_id),
    receiver_id INT REFERENCES users(user_id),
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'accepted', 'declined'
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (sender_id, receiver_id) -- Ensure only one active request at a time
);

-- Table to store user activity log
CREATE TABLE user_activity_log (
    log_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    activity_type VARCHAR(50) NOT NULL,
    details JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store user roles and permissions
CREATE TABLE user_roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Table to map users to roles
CREATE TABLE user_roles_mapping (
    user_id INT REFERENCES users(user_id),
    role_id INT REFERENCES user_roles(role_id),
    PRIMARY KEY (user_id, role_id)
);

-- Table to store connections between users
CREATE TABLE user_connections (
    connection_id SERIAL PRIMARY KEY,
    user1_id INT REFERENCES users(user_id),
    user2_id INT REFERENCES users(user_id)
);
