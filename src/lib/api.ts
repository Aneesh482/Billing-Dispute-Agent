import type {
  User,
  Dispute,
  DisputeCreate,
  DisputeDetail,
  DisputeListResponse,
  GeneratedEmail,
  EmailLog,
  DashboardStats,
  UserSettings,
  SheetValidationResult,
} from "./types";

// ============================================================
// Base API client
// ============================================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

// ============================================================
// Typed API methods
// ============================================================

export const api = {
  auth: {
    me: () => apiFetch<User>("/auth/me"),
    logout: () => apiFetch<void>("/auth/logout", { method: "POST" }),
    loginUrl: () => `${API_BASE}/auth/login`,
  },

  dashboard: {
    stats: () => apiFetch<DashboardStats>("/api/dashboard/stats"),
  },

  disputes: {
    list: (params?: Record<string, string>) => {
      const qs = params ? `?${new URLSearchParams(params).toString()}` : "";
      return apiFetch<DisputeListResponse>(`/api/disputes${qs}`);
    },
    get: (id: string) => apiFetch<DisputeDetail>(`/api/disputes/${id}`),
    create: (data: DisputeCreate) =>
      apiFetch<Dispute>("/api/disputes", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<Dispute>) =>
      apiFetch<Dispute>(`/api/disputes/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    generateEmail: (id: string) =>
      apiFetch<GeneratedEmail>(`/api/disputes/${id}/generate-email`, {
        method: "POST",
      }),
    sendEmail: (id: string, email?: { subject: string; body: string }) =>
      apiFetch<void>(`/api/disputes/${id}/send-email`, {
        method: "POST",
        body: JSON.stringify(email ?? {}),
      }),
    getEmails: (id: string) =>
      apiFetch<EmailLog[]>(`/api/disputes/${id}/emails`),
    getPendingDraft: (id: string) =>
      apiFetch<GeneratedEmail>(`/api/disputes/${id}/pending-draft`),
    approveSend: (id: string, edited?: { subject: string; body: string }) =>
      apiFetch<void>(`/api/disputes/${id}/approve-send`, {
        method: "POST",
        body: JSON.stringify(edited ?? {}),
      }),
    skip: (id: string) =>
      apiFetch<void>(`/api/disputes/${id}/skip`, { method: "POST" }),
  },

  settings: {
    update: (data: Partial<UserSettings>) =>
      apiFetch<User>("/api/users/me/settings", {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    updateApprovalMode: (mode: "auto" | "manual") =>
      apiFetch<User>("/api/users/me/settings", {
        method: "PATCH",
        body: JSON.stringify({ approval_mode: mode }),
      }),
    validateSheet: (spreadsheetId: string) =>
      apiFetch<SheetValidationResult>(
        `/api/sheets/validate?spreadsheet_id=${encodeURIComponent(spreadsheetId)}`
      ),
  },
} as const;
