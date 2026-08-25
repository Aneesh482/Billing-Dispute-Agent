import { Router } from "express";
import { getCurrentUser } from "../middleware/auth";
import type { AuthedRequest } from "../middleware/auth";
import { DisputeCreate, DisputeUpdate } from "../schemas/dispute";
import * as disputeService from "../services/disputeService";

const router = Router();

router.post("", getCurrentUser, async (req: AuthedRequest, res) => {
  const data = DisputeCreate.parse(req.body);
  res.json(await disputeService.createDispute(req.user!.id, data));
});

router.get("", getCurrentUser, async (req: AuthedRequest, res) => {
  const status = req.query.status as string | undefined;
  res.json(await disputeService.getDisputes(req.user!.id, status));
});

router.get("/:disputeId", getCurrentUser, async (req: AuthedRequest, res) => {
  try {
    const disputeId = req.params.disputeId as string;
    res.json(await disputeService.getDispute(req.user!.id,disputeId));
  } catch (e: any) {
    res.status(e.status ?? 500).json({ error: e.message });
  }
});

router.patch("/:disputeId", getCurrentUser, async (req: AuthedRequest, res) => {
  try {
    const data = DisputeUpdate.parse(req.body);
    const disputeId = req.params.disputeId as string;
    res.json(await disputeService.updateDispute(req.user!.id, disputeId, data));
  } catch (e: any) {
    res.status(e.status ?? 500).json({ error: e.message });
  }
});

router.delete("/:disputeId", getCurrentUser, async (req: AuthedRequest, res) => {
  try {
    await disputeService.deleteDispute(req.user!.id, req.params.disputeId);
    res.status(204).end();
  } catch (e: any) {
    res.status(e.status ?? 500).json({ error: e.message });
  }
});

export default router;
