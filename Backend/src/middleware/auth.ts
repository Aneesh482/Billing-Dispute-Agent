import type{ Request, Response, NextFunction } from "express";
import { db } from "../firestoreClient";

export interface AuthedRequest extends Request {
  user?: { id: string; [key: string]: any };
}

export async function getCurrentUser(req: AuthedRequest, res: Response, next: NextFunction) {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  const doc = await db.collection("users").doc(userId).get();
  if (!doc.exists) return res.status(401).json({ error: "User not found" });

  const { google_refresh_token_encrypted, ...safeData } = doc.data()!;
  req.user = { id: userId, ...safeData };
  next();
}
