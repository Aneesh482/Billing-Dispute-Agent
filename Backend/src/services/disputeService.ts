import { db } from "../firestoreClient";
import type { DisputeCreate, DisputeUpdate } from "../schemas/dispute";

export async function createDispute(userId: string, data: DisputeCreate) {
  const ref = db.collection("disputes").doc();
  const doc = {
    user_id: userId,
    ...data,
    currency: data.currency ?? "USD",
    status: "new" as const,
    followup_count: 0,
    next_followup_at: null,
    gmail_thread_id: null,
    amount_recovered: 0,
    sheet_row_number: null,
    created_at: new Date(),
    updated_at: new Date(),
  };
  await ref.set(doc);
  return { id: ref.id, ...doc };
}

export async function getDisputes(userId: string, status?: string) {
  let query = db.collection("disputes").where("user_id", "==", userId);
  if (status) query = query.where("status", "==", status);
  const snap = await query.get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getDispute(userId: string, disputeId: string) {
  const doc = await db.collection("disputes").doc(disputeId).get();
  if (!doc.exists || doc.data()?.user_id !== userId) {
    throw { status: 404, message: "Dispute not found" };
  }
  return { id: doc.id, ...doc.data() };
}

export async function updateDispute(userId: string, disputeId: string, data: DisputeUpdate) {
  const ref = db.collection("disputes").doc(disputeId);
  const doc = await ref.get();
  if (!doc.exists || doc.data()?.user_id !== userId) {
    throw { status: 404, message: "Dispute not found" };
  }
  await ref.set({ ...data, updated_at: new Date() }, { merge: true });
  const updated = await ref.get();
  return { id: updated.id, ...updated.data() };
}

export async function deleteDispute(userId: string, disputeId: string) {
  const ref = db.collection("disputes").doc(disputeId);
  const doc = await ref.get();
  if (!doc.exists || doc.data()?.user_id !== userId) {
    throw { status: 404, message: "Dispute not found" };
  }
  await ref.delete();
}
