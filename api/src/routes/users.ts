/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

import express, { Request, Response } from "express";
import logger from "../utilities/logger";
import bcrypt from "bcrypt";
import pool from "../database/index";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     tags: [Users]
 *     description: Retrieve a list of all users from the database.
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     description: Retrieve a user by their ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Users]
 *     description: Create a new user in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Username or email already in use
 *       500:
 *         description: Internal Server Error
 */
router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, password, full_name, email } = req.body;

    // Check if the username or email is already in use
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ error: "Username or email already in use" });
    }

    // Hash the password before storing it in the database
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (username, password_hash, full_name, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, passwordHash, full_name, email]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    logger.error("Error during signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /users/{user_id}/connections:
 *   get:
 *     summary: Get potential connections for a user
 *     tags: [Users]
 *     description: Retrieve potential connections based on a search query for a specific user.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *       - in: query
 *         name: searchQuery
 *         description: Search query for finding connections
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:user_id/connections", async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const { searchQuery } = req.query;

    // Check if the user exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [userId]
    );

    if (userExists.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Search for potential connections based on the search query
    const potentialConnections = await pool.query(
      `SELECT user_id, username, full_name, email, profile_picture_url
      FROM users
      WHERE user_id != $1
        AND (LOWER(username) LIKE LOWER($2) OR LOWER(full_name) LIKE LOWER($2) OR LOWER(email) LIKE LOWER($2))
        AND user_id NOT IN (
          SELECT user1_id FROM user_connections WHERE user2_id = $1
          UNION
          SELECT user2_id FROM user_connections WHERE user1_id = $1
        )
      LIMIT 10`,
      [userId, `%${searchQuery}%`]
    );

    res.json(potentialConnections.rows);
  } catch (error) {
    logger.error("Error searching for connections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /users/{user_id}/connections/{friend_id}:
 *   delete:
 *     summary: Remove a friend connection
 *     tags: [Users]
 *     description: Remove a friend connection between two users.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *       - in: path
 *         name: friend_id
 *         required: true
 *         description: ID of the friend to be removed
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Friend removed successfully
 *       400:
 *         description: Users are not friends
 *       404:
 *         description: User or friend not found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/:user_id/connections/:friend_id",
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.user_id;
      const friendId = req.params.friend_id;

      // Check if the users exist
      const userExists = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [userId]
      );
      const friendExists = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [friendId]
      );

      if (userExists.rows.length === 0 || friendExists.rows.length === 0) {
        return res.status(404).json({ error: "User or friend not found" });
      }

      // Check if the users are friends
      const existingConnection = await pool.query(
        "SELECT * FROM user_connections WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)",
        [userId, friendId]
      );

      if (existingConnection.rows.length === 0) {
        return res.status(400).json({ error: "Users are not friends" });
      }

      // Remove the friend connection
      await pool.query(
        "DELETE FROM user_connections WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)",
        [userId, friendId]
      );

      res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
      logger.error("Error removing friend:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

/**
 * @swagger
 * /users/{user_id}/games/{game_id}:
 *   post:
 *     summary: Add a user's rank for a specific game
 *     tags: [Users]
 *     description: Add a user's rank for a specific game, either text-based or numeric.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *       - in: path
 *         name: game_id
 *         required: true
 *         description: ID of the game
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text_rank:
 *                 type: string
 *               numeric_rank:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User rank added successfully
 *       400:
 *         description: User already has a rank for today and the specified game
 *       404:
 *         description: User or game not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/:user_id/games/:game_id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const gameId = req.params.game_id;
    const { text_rank, numeric_rank } = req.body;

    // Check if the user and game exist
    const userExists = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [userId]
    );
    const gameExists = await pool.query(
      "SELECT * FROM games WHERE game_id = $1",
      [gameId]
    );

    if (userExists.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    } else if (gameExists.rows.length === 0) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Check if the user already has a rank for today and the specified game
    const existingRank = await pool.query(
      "SELECT * FROM user_ranks WHERE user_id = $1 AND game_id = $2 AND rank_date = CURRENT_DATE",
      [userId, gameId]
    );

    if (existingRank.rows.length > 0) {
      return res
        .status(400)
        .json({
          error: "User already has a rank for today and the specified game",
        });
    }

    // Insert the user's rank for today and the specified game
    const newRank = await pool.query(
      "INSERT INTO user_ranks (user_id, game_id, text_rank, numeric_rank, rank_date) VALUES ($1, $2, $3, $4, CURRENT_DATE) RETURNING *",
      [userId, gameId, text_rank || null, numeric_rank || null]
    );

    res.status(201).json(newRank.rows[0]);
  } catch (error) {
    logger.error("Error adding user rank:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
