# StudySpace ✦

A warm, pastel-themed learning notes website for university students. Built with plain HTML, CSS, and JavaScript, and designed for easy extension by AI following [AGENTS.md](AGENTS.md).

## Features
- Dashboard with three course categories
- Searchable and filterable notes
- Reusable note detail page
- Responsive cream-and-pastel design
- No build step or external dependencies

## Run locally
Because the site uses `fetch()` to load JSON, open it using a local HTTP server (not by double-clicking `index.html`).

```bash
python3 -m http.server 8000
```

Visit http://localhost:8000/.

## Add a note
Read [AGENTS.md](AGENTS.md), then add a valid note object to `data/notes.json`. The homepage and detail page automatically use the new entry.

## Publish with GitHub Pages
1. Create a public GitHub repository named `StudySpace`.
2. Upload the entire project, keeping `index.html` in the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/ (root)`; save.
5. After deployment, the URL should be `https://YOUR-USERNAME.github.io/StudySpace/` (replace YOUR-USERNAME with your GitHub username).

## Project structure
- `index.html` — homepage
- `style.css` — shared styles
- `script.js` — homepage logic
- `data/notes.json` — note content
- `pages/note.html` + `pages/note.js` — reusable detail page
- `AGENTS.md` — AI contributor rules

## AI extension example
> Read AGENTS.md, then add a new note about Java ArrayList to data/notes.json. Follow the required schema and do not modify existing notes.
