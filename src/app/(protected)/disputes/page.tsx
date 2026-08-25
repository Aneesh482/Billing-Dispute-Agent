"use client";

import { DisputeTable } from "@/components/DisputeTable";

export default function DisputesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Disputes</h1>
        <p className="mt-1 text-muted-foreground">
          Manage all your billing disputes
        </p>
      </div>

      <DisputeTable />
    </div>
  );
}
