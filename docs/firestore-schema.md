\# Firestore Collection Schema



\## users/{userId}

\- email: string

\- name: string

\- google\_refresh\_token\_encrypted: string

\- spreadsheet\_id: string | null

\- last\_sheet\_sync\_row: number

\- notification\_email: string

\- slack\_webhook\_url: string | null

\- approval\_mode: "auto" | "manual"

\- created\_at: timestamp



\## disputes/{disputeId}

\- user\_id: string          # filter every query on this — this is the tenant isolation field

\- vendor\_name: string

\- vendor\_contact\_email: string

\- issue\_description: string

\- amount: number

\- currency: string

\- evidence\_description: string | null

\- account\_number: string | null

\- status: "new" | "pending\_approval" | "sent" | "followup\_1" | "followup\_2" | "escalated" | "resolved" | "closed"

\- followup\_count: number

\- next\_followup\_at: timestamp | null

\- gmail\_thread\_id: string | null

\- amount\_recovered: number

\- sheet\_row\_number: number | null

\- created\_at: timestamp

\- updated\_at: timestamp



\## disputes/{disputeId}/events/{eventId}

Full audit trail — subcollection under each dispute.

\- action: string     # "drafted" | "queued\_for\_approval" | "sent" | "followup\_sent" | "escalated" | "resolved"

\- actor: "agent" | "user"

\- content: string | null

\- timestamp: timestamp



\## Notes

\- Firestore is schemaless — this document is the agreed contract between backend (Member 1) and infra (Member 2).

\- Every `disputes` document must carry `user\_id`. This is the only tenant-isolation mechanism since there's no Postgres RLS.

\- No migrations needed. If the schema changes later, update this file and notify the team in Slack/standup.

## Composite Indexes (created in GCP Console)
- disputes: user_id (asc) + status (asc)
- disputes: status (asc) + next_followup_at (asc)


## Artifact Registry
- Repo: dispute-repo (Docker format, us-central1)
- Docker auth configured for: us-central1-docker.pkg.dev
