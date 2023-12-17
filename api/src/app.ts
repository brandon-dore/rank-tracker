import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js";

const app = express();

import usersRouter from "./routes/users.js";
import gamesRouter from "./routes/games.js";
import connectionRequestsRouter from "./routes/connections.js";
import userActivityLogRouter from "./routes/activity.js";
import ranksRouter from "./routes/ranks.js";

app.get("/", (_, res) => {
  res.send("API is responding.");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/connections", connectionRequestsRouter);
app.use("/activity", userActivityLogRouter);
app.use("/ranks", ranksRouter);

export default app;
