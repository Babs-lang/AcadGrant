# Functional Test Specification & Verification Matrix (TC01–TC10)

Designed for live execution in the **Tests (`TC01–TC10`)** tab (`app.js`) against the Supabase PostgreSQL schema, `trg_enforce_submission_gates` trigger, PostgreSQL RLS policies, and seeded Section B records (`B01`–`B06`, Academic Year `2026-2027`, Semester `1`).

| Test ID | Input / Action | Expected Result | Enforcement Mechanism | Target Record |
| :--- | :--- | :--- | :--- | :--- |
| TC01 | Evaluate `B01` (`PROG-EXC`, GWA `2.00`, `18` units, exact deadline `2026-11-06 17:00+08:00`) | `Compliant` at exact GWA and deadline boundaries | `evaluateSubmissionAgainstProgram` + `scholarship_programs` | `B01` · `PROG-EXC` |
| TC02 | Evaluate `B02` (`PROG-EXC`, GWA `2.01` vs `2.00` max) | `With Deficiency` citing GWA threshold exceeded | `evaluateSubmissionAgainstProgram` | `B02` · GWA boundary |
| TC03 | Evaluate `B03` (`PROG-ACC`, `1` dropped subject) | `Compliant` because Access Scholar permits `1` dropped subject | `scholarship_programs.allowed_dropped = 1` | `B03` · `PROG-ACC` |
| TC04 | Evaluate `B04` (`PROG-ACC`, `14` units, `1` INC) | `With Deficiency` citing insufficient units and incomplete grade | Multi-criterion policy check | `B04` · Multi-rule |
| TC05 | Evaluate `B05` (`PROG-EXC`, `1` failed, `17:01+08:00`) | `With Deficiency` citing failed subject and `1 minute` late submission | `Asia/Manila` deadline check | `B05` · Deadline |
| TC06 | Attempt evaluation or `Approved` renewal on `Pending Verification` record `B06` | Both blocked until evidence is `Verified` and evaluated | UI guard + DB trigger `trg_enforce_submission_gates` | `B06` · Verification gate |
| TC07 | Submit duplicate `(B01, 2026-2027, 1)`, GWA `0.50`, or `failed_count = -1` | Duplicate rejected (`23505` / `409`); invalid GWA & negative counts rejected | Client validation + `CHECK` + `UNIQUE(scholar_code, academic_year, semester)` | `semester_submissions` |
| TC08 | Scholar reads `B02` or attempts staff update on `B06` | Cross-scholar read returns 0 rows; verification update denied | PostgreSQL RLS policies + `is_scholarship_staff()` | `semester_submissions` RLS |
| TC09 | Staff returns `B06` with reason; scholar corrects & resubmits; reload page | Status resets to `Pending Verification` with full `audit_logs` history preserved | Supabase PostgreSQL persistence + `audit_logs` | `B06` · Audit trail |
| TC10 | Staff approves `B01`, attempts approving deficient `B02`, holds `B02`; scholar attempts decision | `B01` Approved; deficient `B02` Approve blocked; `B02` Held; scholar blocked | `trg_enforce_submission_gates` + RLS | `B01`, `B02` · Renewal authority |

