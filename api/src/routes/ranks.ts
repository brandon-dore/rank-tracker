/**
 * @swagger
 * tags:
 *   name: Ranks
 *   description: Rank Management
 */

import express, { Request, Response } from "express";
import logger from "../utilities/logger";
import pool from "../database/index";
import { Rank } from "../utilities/types";
import { indexOf } from "lodash";
import { paginationIsValid } from "../utilities/validation";

const router = express.Router();

const getGameRanks = async (id: number) => {
  try {
    const result = await pool.query("SELECT * FROM games WHERE game_id = $1", [
      id,
    ]);
    return result.rows[0].rank_types;
  } catch (error) {
    logger.error(error);
  }
};

const getAverageRank = async (ranks: Rank[]) => {
  let average = 0;
  if (ranks[0].numeric_rank) {
    ranks.forEach((rank) => (average += rank.numeric_rank));
    return average / ranks.length;
  } else {
    const gameRanks = await getGameRanks(ranks[0].game_id);
    ranks.forEach((rank) => {
      average += indexOf(gameRanks, rank.text_rank);
    });
    return gameRanks[average / ranks.length];
  }
};

/**
 * @swagger
 * /ranks:
 *   get:
 *     summary: Get all ranks
 *     tags: [Ranks]
 *     description: Retrieve all ranks of all users from the database.
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM user_ranks");
    res.json(result.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /ranks/user:
 *   get:
 *     summary: Get all ranks of a user on a game
 *     tags: [Ranks]
 *     description: Retrieve all ranks for a specific user on a specific game from the database.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve ranks for
 *         schema:
 *           type: integer
 *       - in: query
 *         name: gameId
 *         required: true
 *         description: ID of the game to retrieve ranks for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

router.get("/user", async (req: Request, res: Response) => {
  try {
    const { userId, gameId } = req.query;

    const result = await pool.query(
      "SELECT * FROM user_ranks WHERE user_id = $1 AND game_id = $2",
      [userId, gameId]
    );
    res.json(result.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /ranks/user/{userId}:
 *   get:
 *     summary: Get rank by user id
 *     tags: [Ranks]
 *     description: Retrieve all ranks for a specific user from the database.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve ranks for
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: pageSize
 *         description: Number of logs per page
 *         schema:
 *           type: integer
 *         default: 10
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { page = 1, pageSize = 10 } = req.query;

    if (!paginationIsValid(page as number, pageSize as number)) {
      return res
        .status(400)
        .json({ error: "Invalid page or pageSize parameters" });
    }

    // Calculate the offset for pagination
    const offset = (Number(page) - 1) * Number(pageSize);
    const result = await pool.query(
      "SELECT * FROM user_ranks WHERE user_id = $1 ORDER BY rank_date DESC LIMIT $2 OFFSET $3",
      [userId, Number(pageSize), offset]
    );
    res.json(result.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /ranks/average:
 *   get:
 *     summary: Get an average of the ranks of a user on a game
 *     tags: [Ranks]
 *     description: Retrieve the average rank of a user on a specific game from the database.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve ranks for
 *         schema:
 *           type: integer
 *       - in: query
 *         name: gameId
 *         required: true
 *         description: ID of the game to retrieve ranks for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

// TODO: Add a since/until parameter.
router.get("/average", async (req: Request, res: Response) => {
  try {
    const { userId, gameId } = req.query;

    const result = await pool.query(
      "SELECT * FROM user_ranks WHERE user_id = $1 AND game_id = $2",
      [userId, gameId]
    );

    const ranks = result.rows;
    res.json(await getAverageRank(ranks));
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/**
 * @swagger
 * /ranks/connections:
 *   get:
 *     summary: Get all ranks of a user and their connections on a game
 *     tags: [Ranks]
 *     description: Retrieve all ranks of a user and their connections on a specific game from the database.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve ranks for
 *         schema:
 *           type: integer
 *       - in: query
 *         name: gameId
 *         required: true
 *         description: ID of the game to retrieve ranks for
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: pageSize
 *         description: Number of logs per page
 *         schema:
 *           type: integer
 *         default: 10
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

// TODO: Add a since/until parameter.
router.get("/connections", async (req: Request, res: Response) => {
  try {
    const { userId, gameId, page = 1, pageSize = 10 } = req.query;

    if (!paginationIsValid(page as number, pageSize as number)) {
      return res
        .status(400)
        .json({ error: "Invalid page or pageSize parameters" });
    }

    // Calculate the offset for pagination
    const offset = (Number(page) - 1) * Number(pageSize);

    const userConnections = await pool.query(
      "SELECT user1_id, user2_id FROM user_connections WHERE user1_id = $1 OR user2_id = $1",
      [userId]
    );
    let connectionIds = userConnections.rows.map((connection) => [
      connection.user1_id,
      connection.user2_id,
    ]);

    connectionIds = [...new Set(connectionIds.flat())];

    const result = await pool.query(
      `SELECT * FROM user_ranks WHERE user_id IN (${connectionIds.join(
        ","
      )}) AND game_id = $1 ORDER BY rank_date DESC LIMIT $2 OFFSET $3`,
      [gameId, Number(pageSize), offset]
    );

    res.json(result.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
