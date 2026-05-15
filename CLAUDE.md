# Elite CLS Website

Freelance build for **Elite Contract Labour Suppliers Limited**, a UK industrial recruitment agency. Built by Max (maxsu / `tarekmaximus1@gmail.com`) for handover to the client owner, **Stewart**. End-state is Stewart fully owns the site with no Max in the chain.

## Live URLs

- **Live site** (Netlify): https://elite-cls.netlify.app
- **Production domain** (eventually): https://elitecontractservices.co.uk
- **Repo**: https://github.com/MiltonMaximus/Elite-CLS-Website
- **CMS admin**: https://app.pagescms.org → open the `Elite-CLS-Website` project

## Stack

- Pure static HTML (no framework, no SSG, no build step)
- **Tailwind CSS** loaded via CDN browser script (`@tailwindcss/browser@4`) — no compilation
- **AOS** for scroll animations, **Lucide** for icons (with inline-SVG fallbacks where Lucide dropped brand icons)
- Hosted on **Netlify**, deploys automatically on every push to `main`
- No backend, no database, no auth on the site itself

## Repo Structure

```
/                       repo root
  index.html            homepage (hero, trust bar, why-us, latest jobs, CTA)
  about.html
  team.html
  sectors.html
  jobs.html             data-driven vacancies page, reads data/jobs.json
  contact.html
  privacy.html
  data/
    jobs.json           single source of truth for all vacancies
  css/styles.css        small custom additions on top of Tailwind
  js/main.js            nav, mobile menu, small interactive bits
  images/               static assets (logo, team photos, etc.)
  .pages.yml            Pages CMS schema for editing jobs.json
  CLAUDE.md             this file
```

## Content Editing (Jobs)

Vacancies live in `data/jobs.json` as `{"jobs": [...]}`. The homepage "Latest Jobs" section and the dedicated `/jobs` page both fetch this file client-side via JavaScript and render cards.

**Editing flow:**
1. Editor signs into https://app.pagescms.org (with their GitHub)
2. Opens the `Elite-CLS-Website` project → Vacancies
3. Visual form: add / edit / remove vacancies
4. Save → Pages CMS commits to `main` → Netlify auto-rebuilds (~60 sec) → site updates

Jobs schema (defined in `.pages.yml`): title, location, type, status badge (Hiring Now / Multiple Roles / Urgent / Closed), description, date_posted (controls homepage ordering — newest 3 surface there, rest live on `/jobs`).

When `jobs` is empty, the homepage shows 3 skeleton "Vacancies coming soon" cards; `/jobs` shows an empty-state CTA. As real jobs are added, skeletons get replaced one-by-one.

## Deploy Workflow

- Anything pushed to `main` deploys live within ~60 seconds.
- No PR review process — Max is sole maintainer, push directly to main.
- Netlify build is "no command, publish dir = `.`" (static).

`.claude/settings.local.json` has an autoMode allow rule so this Claude Code session can push to main without prompting (push-to-main here IS the deploy workflow, not a PR-review bypass).

## Handover Plan

Stewart receives the finished site + CMS. End-state at handover:

1. Stewart creates his own **GitHub** account → Max transfers ownership of `Elite-CLS-Website` repo to him.
2. Stewart creates his own **Netlify** account → connects to his now-owned GitHub repo → re-deploys.
3. Stewart's domain `elitecontractservices.co.uk` DNS gets pointed at his Netlify project.
4. Stewart creates his own **Pages CMS account** at pagescms.org → installs the GitHub App on his GitHub → opens his repo as a Pages CMS project.
5. Max walks away. No accounts in Max's name remain in the chain.

A 1-page PDF guide with screenshots will be prepared for Stewart at handover time covering each signup step. Stewart's only effort: ~10 minutes of clicking signup forms.

## Privacy / Compliance

`/privacy` is a UK-GDPR-compliant privacy policy. Key facts baked in:

- Registered company: Elite Contract Labour Suppliers Limited, No. 4061896
- Registered office (Companies House): 4 Minster Court, Tuscam Way, Camberley, Surrey, GU15 3YY
- Operational / correspondence address: 580 Cranbrook Road, Gants Hill, IG2 6RF
- ICO registration reference: Z8738212
- Stewart confirmed Elite CLS does NOT carry out DBS checks (so DBS clauses are absent from the policy)
- Stewart does carry out right-to-work checks (covered under "Employment data")
- Worker records retained ~2 years post-engagement; website contact form data deleted on first contact

All 6 page footers carry a small-print "Registered office" line for Companies Act 2006 / Trading Disclosures Regs compliance, separate from the operational address shown in the Contact Us blocks.

## Things NOT in the repo / NOT to add

- No Cloudflare Worker. Earlier attempt at Sveltia CMS auth via a self-hosted Worker was abandoned in favour of Pages CMS (hosted). Any leftover Worker / GitHub OAuth app from that attempt can be deleted from Max's Cloudflare and GitHub Developer settings — not referenced anywhere in this repo.
- No Netlify Identity. It's deprecated for new sites and unused here.
- No backend, no Node, no npm scripts, no `package.json`. Site is intentionally zero-build.
