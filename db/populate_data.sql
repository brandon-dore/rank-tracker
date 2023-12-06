-- Insert 15 users with fake but realistic information
INSERT INTO users (username, password_hash, full_name, email, profile_picture_url)
VALUES
  ('user1', 'password1', 'User One', 'user1@example.com', 'profile1.jpg'),
  ('user2', 'password2', 'User Two', 'user2@example.com', 'profile2.jpg'),
  ('user3', 'password3', 'User Three', 'user3@example.com', 'profile3.jpg'),
  ('user4', 'password4', 'User Four', 'user4@example.com', 'profile4.jpg'),
  ('user5', 'password5', 'User Five', 'user5@example.com', 'profile5.jpg'),
  ('user6', 'password6', 'User Six', 'user6@example.com', 'profile6.jpg'),
  ('user7', 'password7', 'User Seven', 'user7@example.com', 'profile7.jpg'),
  ('user8', 'password8', 'User Eight', 'user8@example.com', 'profile8.jpg'),
  ('user9', 'password9', 'User Nine', 'user9@example.com', 'profile9.jpg'),
  ('user10', 'password10', 'User Ten', 'user10@example.com', 'profile10.jpg'),
  ('user11', 'password11', 'User Eleven', 'user11@example.com', 'profile11.jpg'),
  ('user12', 'password12', 'User Twelve', 'user12@example.com', 'profile12.jpg'),
  ('user13', 'password13', 'User Thirteen', 'user13@example.com', 'profile13.jpg'),
  ('user14', 'password14', 'User Fourteen', 'user14@example.com', 'profile14.jpg'),
  ('user15', 'password15', 'User Fifteen', 'user15@example.com', 'profile15.jpg');

-- Insert 2 users with admin roles
INSERT INTO user_roles (role_name) VALUES ('admin') RETURNING role_id;
INSERT INTO user_roles_mapping (user_id, role_id) VALUES (1, 1);
INSERT INTO user_roles_mapping (user_id, role_id) VALUES (2, 1);

-- Insert friendship
INSERT INTO user_connections (user1_id, user2_id) VALUES (1, 2), (2, 3), (3, 4), (4, 5), (5, 6), (6, 7), (7, 8), (8, 9), (9, 10), (10, 11), (11, 12), (12, 13), (13, 14), (14, 15);

-- Insert 2 friend requests between users who aren't already friends
INSERT INTO connection_requests (sender_id, receiver_id) VALUES (1, 3), (5, 9);

-- Insert Counter Strike 2 into games table
INSERT INTO games (game_name, rank_format, rank_range_low, rank_range_high, rank_types)
VALUES (
    'Counter Strike 2', 
    'numeric', 
    1, 
    40000, 
    NULL
);

-- Insert Rocket League into games table
INSERT INTO games (game_name, rank_format, rank_range_low, rank_range_high, rank_types)
VALUES (
    'Rocket League', 
    'text', 
    NULL, 
    NULL, 
    ARRAY['Unranked', 'Bronze I', 'Bronze II', 'Bronze III', 'Silver I', 'Silver II', 'Silver III', 'Gold I', 'Gold II', 'Gold III', 'Platinum I', 'Platinum II', 'Platinum III', 'Diamond I', 'Diamond II', 'Diamond III', 'Champion I', 'Champion II', 'Champion III', 'Grand Champion I', 'Grand Champion II', 'Grand Champion III', 'Supersonic Legend']
);

-- Insert CS:GO ranks
INSERT INTO user_ranks (user_id, game_id, numeric_rank, rank_date)
SELECT user_id, 1, FLOOR(RANDOM() * 40000) + 1, CURRENT_DATE - INTERVAL '1' DAY
FROM users
LIMIT 5;

-- Insert Rocket League ranks
INSERT INTO user_ranks (user_id, game_id, text_rank, rank_date)
SELECT user_id, 2, 
  CASE 
    WHEN user_id IN (1, 2, 3, 4, 5) THEN 
      (ARRAY['Unranked', 'Bronze I', 'Bronze II', 'Bronze III', 'Silver I', 'Silver II', 'Silver III', 'Gold I', 'Gold II', 'Gold III', 'Platinum I', 'Platinum II', 'Platinum III', 'Diamond I', 'Diamond II', 'Diamond III', 'Champion I', 'Champion II', 'Champion III', 'Grand Champion I', 'Grand Champion II', 'Grand Champion III', 'Supersonic Legend'])[FLOOR(RANDOM() * 24) + 1]
    WHEN user_id IN (6, 7, 8, 9, 10, 11, 12, 13, 14, 15) THEN 
      (ARRAY['Unranked', 'Bronze I', 'Bronze II', 'Bronze III', 'Silver I', 'Silver II', 'Silver III', 'Gold I', 'Gold II', 'Gold III', 'Platinum I', 'Platinum II', 'Platinum III', 'Diamond I', 'Diamond II', 'Diamond III', 'Champion I', 'Champion II', 'Champion III', 'Grand Champion I', 'Grand Champion II', 'Grand Champion III', 'Supersonic Legend'])[FLOOR(RANDOM() * 24) + 1]
  END,
  CURRENT_DATE - INTERVAL '1' DAY
FROM users
WHERE user_id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

-- Insert dummy entries in the user activity log
INSERT INTO user_activity_log (user_id, activity_type, details, timestamp)
VALUES
  (1, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '1' HOUR),
  (2, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '2' HOUR),
  (3, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '3' HOUR),
  (4, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '4' HOUR),
  (5, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '5' HOUR),
  (6, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '6' HOUR),
  (7, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '7' HOUR),
  (8, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '8' HOUR),
  (9, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '9' HOUR),
  (10, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '10' HOUR),
  (11, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '11' HOUR),
  (12, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '12' HOUR),
  (13, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '13' HOUR),
  (14, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '14' HOUR),
  (15, 'account_creation', '{"details": "User account created."}', CURRENT_TIMESTAMP - INTERVAL '15' HOUR),
  (1, 'sign_in', '{"details": "User signed in."}', CURRENT_TIMESTAMP - INTERVAL '1' MINUTE),
  (2, 'sign_in', '{"details": "User signed in."}', CURRENT_TIMESTAMP - INTERVAL '2' MINUTE),
  (3, 'sign_in', '{"details": "User signed in."}', CURRENT_TIMESTAMP - INTERVAL '3' MINUTE),
  (4, 'sign_in', '{"details": "User signed in."}', CURRENT_TIMESTAMP - INTERVAL '4' MINUTE),
  (5, 'sign_in', '{"details": "User signed in."}', CURRENT_TIMESTAMP - INTERVAL '5' MINUTE),
  (6, 'sign_in', '{"details": "User signed in."}', CURRENT_TIMESTAMP - INTERVAL '6')
