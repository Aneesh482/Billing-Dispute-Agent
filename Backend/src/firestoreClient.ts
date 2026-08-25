import { Firestore } from "@google-cloud/firestore";
import { settings } from "./config";

export const db = new Firestore({
  projectId: settings.GCP_PROJECT_ID,
});
