/**
 * @swagger
 * tags:
 *   name: Connections
 *   description: Connection request management
 */

import express, { Request, Response } from 'express';
import logger from '../utilities/logger';
import pool from '../database/index';

const router = express.Router();

/**
 * @swagger
 * /connections:
 *   get:
 *     summary: Get a list of all connection requests
 *     tags: [Connections]
 *     description: Retrieve a list of all connection requests from the database.
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM connection_requests');
    res.json(result.rows);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * @swagger
 * /connections/{id}:
 *   get:
 *     summary: Get connection request by ID
 *     tags: [Connections]
 *     description: Retrieve a connection request by its ID from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the connection request to retrieve
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
    const result = await pool.query('SELECT * FROM connection_requests WHERE request_id = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
