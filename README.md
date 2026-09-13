# ECE FRESHERS — Landing Page + Google Form Registration

Mobile-first landing page for the ECE Freshers event (19 September 2026).
The animated intro/hero page is custom-built; actual registration (name,
year, section, cash/online branching, payment screenshot upload) happens
through a single Google Form, and responses land in a Google Sheet.

## Why this setup

No backend to host, no database to configure — Google Forms + Sheets *is*
the backend. You get file uploads, a spreadsheet you already know how to
use, and instant sharing with other organizers, at the cost of some custom
polish (see "Limitations" below).

## File structure

```
index.html        landing page: intro animation + hero + link into the Form
css/style.css
js/config.js       ← event details, pricing, and the Form link live here
js/app.js
assets/            (empty — no QR image needed here; it lives inside the Form)
```

## 1. The Google Form

Already set up with branching: the first question is Cash or Online, and
Online branches into the payment screenshot upload. Sheet columns will be
roughly: Timestamp, Full Name, Year, Section, Payment Method, [Screenshot
file link if Online], [UPI reference if you added that field].

**Share the response Sheet with your organizers:** open the Form →
Responses tab → green Sheets icon → open the Sheet it creates → Share →
add their emails as Editors.

## 2. Configure the site

Open `js/config.js` — the Form link is already filled in. Update
`AMOUNT`, `CONTACT_NAME`, `CONTACT_PHONE` if anything changes.

## 3. Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "ECE Freshers landing page"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ece-freshers.git
git push -u origin main
```

Then: repo **Settings → Pages → Source: Deploy from branch → main → / (root)**.
Live at `https://YOUR-USERNAME.github.io/ece-freshers/`.

## Managing registrations in Sheets

**Sorting into 2nd-A / 2nd-B / 1st-A / 1st-B order:** select your data range
→ **Data → Sort range** → add sort levels: Year (custom order: 2nd Year
before 1st Year — easiest is a helper column with 1/2/3/4 per group, sorted
ascending), then Section. Or use a formula in a new sheet:

```
=QUERY(Form Responses 1!A:F, "select * where E = '2nd Year' and F = 'A' order by A")
```

repeated for each of the four groups (stack them, or put each on its own tab).

**Registration IDs:** Forms won't auto-generate `ECE26-0001` style IDs.
Add a helper column: `="ECE26-"&TEXT(ROW()-1,"0000")`.

**Marking cash as paid / verifying online screenshots:** add a "Status"
column organizers fill in manually (Pending / Paid / Verified / Rejected).
To view a screenshot, click the file link Forms puts in that response's row
— it opens the image from your Drive.

**Printing:** File → Print, or select the sorted range and print just that.
Sheets' print layout is plain black-on-white by default, which fits the
"print-friendly, professional" requirement without extra work.

**CSV export:** File → Download → Comma Separated Values (.csv).

## Limitations vs. a custom backend

- No live-updating summary cards (total registrations, pending count, etc.)
  — you're reading the Sheet directly.
- No one-tap "Verify"/"Reject" buttons — status is a manual column edit.
- No signed/expiring screenshot links — anyone with Editor access to the
  Sheet can open any screenshot via its Drive link, for as long as they
  have access. Keep the organizer list to people you trust with that.
- No automatic duplicate blocking — if this matters, turn on "Limit to 1
  response" in Form settings (Settings → Responses), which requires
  respondents to sign in with a Google account.
