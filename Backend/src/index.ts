import express from "express";
import cors from "cors";
import session from "express-session"
const app = express();
app.use(express.json());
import { settings } from "./config";

app.use(
  session({
    secret: settings.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: settings.ENVIRONMENT === "production" },
  })
);

app.use(
  cors({
    origin: settings.FRONTEND_URL,
    credentials: true,
  })
);
// app.use("/auth", authRouter);
// app.use("/api/disputes", disputesRouter);
// app.use("/api/dashboard", dashboardRouter);
// app.use("/api/sheets", sheetsRouter);
// app.use("/internal", internalRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
// add in env later
const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
