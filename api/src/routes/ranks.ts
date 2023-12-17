/**
 * @swagger
 * tags:
 *   name: Ranks
 *   description: Rank Management
 */

import express, { Request, Response } from "express";
import logger from "../utils/logger";
import pool from "../database/index";

const router = express.Router();

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
 * /ranks/{rankId}:
 *   get:
 *     summary: Get one rank
 *     tags: [Ranks]
 *     description: Retrieve one rank by id from the database.
 *     parameters:
 *       - in: path
 *         name: rankId
 *         required: true
 *         description: ID of the rank
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/:rankId", async (req: Request, res: Response) => {
  try {
    const { rankId } = req.params;
    const result = await pool.query(
      "SELECT * FROM user_ranks WHERE rank_id = $1",
      [rankId]
    );
    res.json(result.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
