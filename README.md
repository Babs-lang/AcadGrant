# AcadGrant — Student Scholarship Monitoring & Academic Compliance Website

**SAD Laboratory Examination — Section B**

## Stack

- **Frontend:** Pure HTML5 (`index.html`), CSS3 (`styles.css`), and Vanilla JavaScript (`app.js`)
- **Backend / Database / Auth:** Supabase (`@supabase/supabase-js` v2, PostgreSQL, Row-Level Security policies, and database triggers)

## Supabase Setup (Required Once)

1. Open your Supabase project (`https://pkakmsdvgmjgeqbirtsn.supabase.co`) **SQL Editor**.
2. Paste and run `supabase/setup_all.sql` (or run `supabase/migrations/001_scholarship_schema.sql` followed by `supabase/seed.sql`).
   - Creates `user_profiles`, `scholarship_programs`, `scholar_assignments`, `semester_submissions`, and `audit_logs`.
   - Installs `on_auth_user_created` trigger so signing up with `staff@acadgrant.edu` assigns `staff` role and signing up with `b01@acadgrant.edu`..`b06@acadgrant.edu` links the matching scholar record.
   - Enables PostgreSQL RLS policies isolating Scholar reads/writes from Staff operations.
   - Installs `trg_enforce_submission_gates` trigger blocking unverified compliance evaluation and non-compliant renewal approval.
   - Seeds **Excellence Scholar**, **Access Scholar**, and records **B01–B06**.

## Running Locally

You can serve the root directory with any static web server (or Vite dev server):

```bash
npm install
npm run dev
```

Or serve statically with Python / Node:

```bash
npx serve .
```

## File Structure

- `index.html` — Single-page HTML structure (Auth, Dashboard, Submit Grades, Scholars & Policies, Audit History, Part I Analysis, TC01–TC10 Tests)
- `styles.css` — Clean institutional CSS styling
- `app.js` — Vanilla JavaScript application logic connected to Supabase Auth & PostgREST
- `supabase/setup_all.sql` — Combined PostgreSQL schema, RLS policies, triggers, and seed data
- `supabase/migrations/001_scholarship_schema.sql` — Schema, triggers, and RLS policies
- `supabase/seed.sql` — Policy records and `B01`–`B06` seed data
- `ANALYSIS_AND_DESIGN.md` — Part I (`A1`–`A6`) Analysis & Design report
- `TEST_RESULTS.md` — Functional test results (`TC01`–`TC10`)
