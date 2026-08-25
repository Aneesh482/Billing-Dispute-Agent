"use client";

import { Badge } from "@/components/ui/badge";
import type { DisputeStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  DisputeStatus,
  { label: string; className: string }
> = {
  new: {
    label: "New",
    className: "bg-zinc-100 text-zinc-700 border-zinc-200",
  },
  pending_approval: {
    label: "Pending Approval",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },
  sent: {
    label: "Sent",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  follow_up_1: {
    label: "Follow-Up 1",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  follow_up_2: {
    label: "Follow-Up 2",
    className: "bg-orange-100 text-orange-700 border-orange-200",
  },
  escalated: {
    label: "Escalated",
    className: "bg-red-100 text-red-700 border-red-200",
  },
  resolved: {
    label: "Resolved",
    className: "bg-green-100 text-green-700 border-green-200",
  },
  closed: {
    label: "Closed",
    className: "bg-zinc-100 text-zinc-500 border-zinc-200",
  },
};

export function StatusBadge({ status }: { status: DisputeStatus }) {
  const config = statusConfig[status] ?? {
    label: status,
    className: "bg-zinc-100 text-zinc-700",
  };

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium capitalize", config.className)}
    >
      {config.label}
    </Badge>
  );
}
