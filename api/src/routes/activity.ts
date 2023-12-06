/**
 * @swagger
 * tags:
 *   name: User Activity Log
 *   description: User activity log management
 */

import express, { Request, Response } from 'express';
import logger from '../utilities/logger';
import pool from '../database/index';

const router = express.Router();

/**
 * @swagger
 * /activity:
 *   get:
 *     summary: Get a list of all user activity logs
 *     tags: [User Activity Log]
 *     description: Retrieve a list of all user activity logs from the database.
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM user_activity_log');
    res.json(result.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /activity/{id}:
 *   get:
 *     summary: Get user activity log by ID
 *     tags: [User Activity Log]
 *     description: Retrieve a user activity log by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user activity log to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM user_activity_log WHERE log_id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /activity/{user_id}:
 *   get:
 *     summary: Get paginated user activity logs for a specific user
 *     tags: [User Activity Log]
 *     description: Retrieve paginated user activity logs for a specific user from the database.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID of the user
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
 *       400:
 *         description: Invalid page or pageSize parameters
 *       500:
 *         description: Internal Server Error
 */
router.get('/:user_id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const { page = 1, pageSize = 10 } = req.query;

    // Validate page and pageSize parameters
    if (isNaN(Number(page)) || isNaN(Number(pageSize)) || Number(page) <= 0 || Number(pageSize) <= 0) {
      return res.status(400).json({ error: 'Invalid page or pageSize parameters' });
    }

    // Calculate the offset for pagination
    const offset = (Number(page) - 1) * Number(pageSize);

    // Fetch paginated activity logs for the specific user
    const activityLogs = await pool.query(
      'SELECT * FROM user_activity_log WHERE user_id = $1 ORDER BY timestamp DESC LIMIT $2 OFFSET $3',
      [userId, Number(pageSize), offset]
    );

    res.json(activityLogs.rows);
  } catch (error) {
    logger.error('Error fetching paginated activity logs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
