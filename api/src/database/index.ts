import { Pool } from "pg";
import { DB } from "../utils/secrets";

const pool = new Pool({
  user: DB.USER,
  host: DB.HOST,
  database: DB.NAME,
  password: DB.PASSWORD,
  port: DB.PORT,
});

export default pool;
