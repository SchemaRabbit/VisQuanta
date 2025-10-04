# VisQuanta Glossary

VisQuanta Glossary is a multilingual reference site that explains key concepts behind the [VisQuanta](https://visquanta.com/) platform for AI-powered automotive dealership solutions. The site is built with the Next.js App Router, styled with Tailwind CSS, and statically renders every glossary entry in English plus eight translated languages so global teams can access shared terminology.

## Features
- Multilingual glossary with English plus French, Spanish, German, Arabic, Hindi, Portuguese, Russian, and Chinese translations.
- JSON-driven content model stored in `hosting/data/glossary.json`, making glossary edits versionable and code-review friendly.
- Pre-rendered landing, listing, and per-term pages for every supported language using file-based routing in the Next.js App Router.
- Consistent dark theme UI with Tailwind CSS and reusable layout primitives.
- Sitemap generation that covers every language/term combination when `NEXT_PUBLIC_BASE_URL` is configured.
- Firebase Hosting configuration (`firebase.json`) ready for deployment with the Firebase CLI.

## Repository Structure
- `hosting/app/` – Next.js App Router source (root layout, language routes, and per-term pages).
- `hosting/data/glossary.json` – Canonical glossary data, including localized slugs, terms, and descriptions per language.
- `hosting/tailwind.config.js` – Tailwind configuration with project-specific theme extensions.
- `firebase.json` – Firebase Hosting configuration pointing to the `hosting` directory.
- `data/` – Placeholder for additional data sources or exports outside of the deployed app.

## Getting Started
1. Install Node.js 18 or newer.
2. Change into the Next.js app directory: `cd hosting`.
3. Install dependencies: `npm install`.
4. Start the development server: `npm run dev` (uses Turbopack).

When developing locally, visit the printed URL (defaults to `http://localhost:3000`).

## Available Scripts
- `npm run dev` – Start the development server with Turbopack.
- `npm run build` – Create an optimized production build.
- `npm run start` – Serve the production build locally.

## Managing Glossary Content
- Edit `hosting/data/glossary.json` to add, update, or remove entries. Each term contains an English definition plus localized metadata under `translations`.
- Use `hosting/add_translations.py` to append translation blocks when expanding into new languages. The script expects to run from the `hosting` directory.
- After updating glossary content, rebuild (`npm run build`) so translated pages pick up the changes.

## Deployment
The project is configured for Firebase Hosting. To deploy:
1. Authenticate with Firebase CLI and select the appropriate project (`firebase login` then `firebase use <project-id>`).
2. Build the app: `cd hosting && npm run build`.
3. Deploy hosting assets: `firebase deploy --only hosting`.

## License
Released under the [MIT License](LICENSE).
