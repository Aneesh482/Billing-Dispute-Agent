# DisputeFlow Frontend

Production-quality Next.js frontend for the DisputeFlow billing dispute automation platform.

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript** (strict mode)
- **Tailwind CSS** v4
- **shadcn/ui** components (New York style)
- **Lucide React** icons
- **Sonner** for toast notifications

## Features

- 🔐 Google OAuth authentication
- 📊 Dashboard with stats and dispute tracking
- 📧 AI-powered email generation with approval workflow
- ⚙️ Settings management (Google Sheets, approval mode, notifications)
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Clean, modern SaaS design
- ♿ Accessible UI components

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Docker

Build and run with Docker:

```bash
# Build image
docker build -t disputeflow-frontend .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000 \
  disputeflow-frontend
```

The Dockerfile uses multi-stage builds with Next.js standalone output for optimal image size.

## Project Structure

```
src/
├── app/
│   ├── (protected)/        # Protected routes (require auth)
│   │   ├── dashboard/
│   │   ├── disputes/
│   │   │   └── [id]/
│   │   └── settings/
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Landing/login page
│
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Sidebar.tsx
│   ├── StatsCards.tsx
│   ├── DisputeTable.tsx
│   ├── DisputeForm.tsx
│   ├── EmailPreview.tsx
│   ├── EmailThread.tsx
│   ├── PendingApproval.tsx
│   ├── StatusBadge.tsx
│   └── Toaster.tsx
│
└── lib/
    ├── api.ts              # API client
    ├── types.ts            # TypeScript types
    ├── auth-context.tsx    # Authentication provider
    └── utils.ts            # Utilities
```

## API Integration

The frontend integrates with the backend API via the following endpoints:

**Authentication:**
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout
- `GET /auth/login` - Google OAuth login redirect

**Dashboard:**
- `GET /api/dashboard/stats` - Dashboard statistics

**Disputes:**
- `GET /api/disputes` - List disputes
- `GET /api/disputes/:id` - Get dispute detail
- `POST /api/disputes` - Create dispute
- `PATCH /api/disputes/:id` - Update dispute
- `POST /api/disputes/:id/generate-email` - Generate email
- `POST /api/disputes/:id/send-email` - Send email
- `GET /api/disputes/:id/emails` - Get email history
- `GET /api/disputes/:id/pending-draft` - Get pending draft
- `POST /api/disputes/:id/approve-send` - Approve and send
- `POST /api/disputes/:id/skip` - Skip approval

**Settings:**
- `PATCH /api/users/me/settings` - Update user settings
- `GET /api/sheets/validate` - Validate Google Sheet

## Email Approval Workflow

The app supports two approval modes:

### Auto-send Mode
Generated emails are sent immediately without review.

### Manual Mode
1. Email is generated and enters `pending_approval` state
2. User reviews the draft on the dispute detail page
3. User can:
   - **Send** - Approve as-is
   - **Edit** - Modify subject/body then send
   - **Skip** - Dismiss this draft

## Dispute Status Flow

```
new
 ↓
generate email
 ↓
AUTO → sent
 OR
MANUAL → pending_approval → (Send/Edit/Skip) → sent
 ↓
follow_up_1 → follow_up_2 → escalated → resolved
```

## Security

- Cookies-based authentication (credentials: "include")
- No secrets in `NEXT_PUBLIC_*` variables
- Protected routes require authentication
- Input validation on all forms
- Sanitized HTML rendering for email previews

## Accessibility

- Semantic HTML
- Keyboard navigation
- ARIA labels and roles
- Accessible form controls
- Sufficient color contrast
- Focus states

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

Proprietary - All rights reserved
