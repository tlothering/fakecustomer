# Khanya Power Solutions — Marketing Website

> **Solar & Alternative Power Backup Specialists**
> A static marketing website for a fictional Gauteng SME power-backup company.
> Demo brand — all contact details and testimonials are placeholder content only.

---

## What's in the repo

| File | Purpose |
|------|---------|
| `index.html` | Single-page marketing site (all sections) |
| `style.css` | Hand-written modern CSS (no build step required) |
| `script.js` | Vanilla JS — mailto CTA, scroll animations, hamburger menu |
| `.nojekyll` | Tells GitHub Pages not to run Jekyll processing |
| `README.md` | This file |

---

## Deploy to GitHub Pages (5 steps)

1. **Fork or push** this repository to your GitHub account.

2. Go to **Settings → Pages** in your repository.

3. Under **Source**, select **Deploy from a branch**.

4. Choose the branch you want to deploy from (e.g. `main`) and set the folder to **`/ (root)`**.

5. Click **Save**. GitHub will build and publish the site at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

> The `.nojekyll` file in the repository root ensures GitHub Pages serves the raw static files without any Jekyll transformation.

---

## Local preview (no build step needed)

Open `index.html` directly in any modern browser, **or** run a simple local server:

```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080`.

---

## Customising

- **Brand colours** — edit the CSS custom properties at the top of `style.css` (`:root { --clr-primary: …; --clr-accent: …; }`).
- **Email recipient / subject / body** — edit the constants at the top of `script.js` (`MAIL_TO`, `MAIL_SUBJECT`, `MAIL_BODY`).
- **Content** — all copy lives in `index.html`; sections are clearly commented.

---

## Tech stack

- Pure HTML5 / CSS3 / Vanilla JavaScript — no build step, no framework
- [Google Fonts](https://fonts.google.com/) — Poppins + Inter (via CDN)
- [Phosphor Icons](https://phosphoricons.com/) — lightweight SVG icon set (via CDN)
- Deploys as-is to GitHub Pages
