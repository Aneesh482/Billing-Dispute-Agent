"use client";

import { useState, useEffect } from "react";
import { StatsCards } from "@/components/StatsCards";
import { DisputeTable } from "@/components/DisputeTable";
import { api } from "@/lib/api";
import type { DashboardStats } from "@/lib/types";
import { toast } from "sonner";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await api.dashboard.stats();
        setStats(data);
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to load dashboard stats."
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Track your disputes and recovery progress
        </p>
      </div>

      <StatsCards stats={stats} isLoading={isLoading} />

      <div>
        <h2 className="mb-4 text-xl font-semibold">Disputes</h2>
        <DisputeTable />
      </div>
    </div>
  );
}
