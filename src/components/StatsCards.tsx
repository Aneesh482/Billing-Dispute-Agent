"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardStats } from "@/lib/types";
import { AlertCircle, DollarSign, TrendingUp, BarChart3 } from "lucide-react";

interface StatsCardsProps {
  stats: DashboardStats | null;
  isLoading: boolean;
}

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  const cards = [
    {
      title: "Active Disputes",
      value: stats?.active_disputes ?? 0,
      format: (v: number) => v.toString(),
      icon: AlertCircle,
      accent: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Total Disputed",
      value: stats?.total_disputed ?? 0,
      format: (v: number) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(v),
      icon: DollarSign,
      accent: "text-red-600",
      bg: "bg-red-50",
    },
    {
      title: "Recovered This Month",
      value: stats?.recovered_this_month ?? 0,
      format: (v: number) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(v),
      icon: TrendingUp,
      accent: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Success Rate",
      value: stats?.success_rate ?? 0,
      format: (v: number) => `${(v * 100).toFixed(1)}%`,
      icon: BarChart3,
      accent: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${card.bg}`}>
              <card.icon className={`h-4 w-4 ${card.accent}`} />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-2xl font-bold">{card.format(card.value)}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
