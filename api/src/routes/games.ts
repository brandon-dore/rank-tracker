/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Game management
 */

import express, { Request, Response } from "express";
import logger from "../utils/logger";
import pool from "../database/index";

const router = express.Router();

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get a list of all games
 *     tags: [Games]
 *     description: Retrieve a list of all games from the database.
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM games");
    res.json(result.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get game by ID
 *     tags: [Games]
 *     description: Retrieve a game by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the game to retrieve
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
    const result = await pool.query("SELECT * FROM games WHERE game_id = $1", [
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
 * /games:
 *   post:
 *     summary: Add a new game
 *     tags: [Games]
 *     description: Create a new game in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game_name:
 *                 type: string
 *               rank_format:
 *                 type: string
 *               rank_range_low:
 *                 type: integer
 *               rank_range_high:
 *                 type: integer
 *               rank_types:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Game created successfully
 *       400:
 *         description: Either rank_range or rank_types should be defined, not both
 *       404:
 *         description: Game already exists
 *       500:
 *         description: Internal Server Error
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      game_name,
      rank_format,
      rank_range_low,
      rank_range_high,
      rank_types,
    } = req.body;

    // Check if both rank_range and rank_types are defined
    if (
      (rank_range_low !== undefined || rank_range_high !== undefined) &&
      rank_types !== undefined
    ) {
      return res.status(400).json({
        error: "Either rank_range or rank_types should be defined, not both",
      });
    }

    // Check if the game already exists
    const existingGame = await pool.query(
      "SELECT * FROM games WHERE game_name = $1",
      [game_name]
    );

    if (existingGame.rows.length > 0) {
      return res.status(400).json({ error: "Game already exists" });
    }

    // Insert the new game into the database
    const newGame = await pool.query(
      "INSERT INTO games (game_name, rank_format, rank_range_low, rank_range_high, rank_types) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [game_name, rank_format, rank_range_low, rank_range_high, rank_types]
    );

    res.status(201).json(newGame.rows[0]);
  } catch (error) {
    logger.error("Error adding game:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
