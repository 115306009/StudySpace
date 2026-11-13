# StudySpace — AI Development Guide

## Purpose
StudySpace is a friendly, bilingual-label (English course names, Traditional Chinese explanations) learning notes website for university students. It is a static website hosted on GitHub Pages. Its main goal is to make notes easy to find, read, and extend.

## Technology
- Use plain HTML5, CSS3, and vanilla JavaScript (ES6+).
- No frameworks, build tools, servers, external APIs, or required accounts.
- All file references must be relative so the site works under a GitHub Pages repository subpath.

## Visual design
- Cream background `#FFF9F1`, purple `#8575B7`, blush `#F6DDE5`, sage `#DDEBDD`, ink `#34313B`.
- Use rounded cards, gentle shadows, generous whitespace, readable typography, and consistent spacing.
- Responsive layout for mobile and desktop; keyboard-friendly controls and visible focus states.
- Avoid flashy animations, autoplay, and clutter.

## File structure
- `index.html`: home, search, course filters, and note cards.
- `style.css`: shared design system and responsive styles.
- `script.js`: fetch, render, filter, and safe DOM helpers.
- `data/notes.json`: the single source of truth for note content.
- `pages/note.html`: reusable detail page for every note.
- `AGENTS.md`: rules for AI collaborators.
- `README.md`: setup, publishing, and project overview.
- `assets/images/`: optional local images, named descriptively in kebab-case.

## Content schema
Every entry in `data/notes.json` must have:
- `id`: unique lowercase kebab-case string, e.g. `java-arrays`.
- `course`: one of `Java Programming`, `Accounting`, `Economics` (new courses may be added consistently).
- `title`: concise note title.
- `summary`: one or two short sentences.
- `date`: `YYYY-MM-DD`.
- `tags`: array of 1–5 short strings.
- `sections`: array of objects with `heading` and `body` strings; optional `code` string for code examples.

Use Traditional Chinese for note explanations, while technical terms and course names may remain English. Explain concepts accurately and simply. Never invent citations or claim unverified content is official course material.

## How to add a note
1. Read this AGENTS.md and inspect `data/notes.json`.
2. Add exactly one new object matching the schema, with a unique `id`.
3. Write a clear summary and at least two useful sections; use short examples when appropriate.
4. Do not create a new HTML page: the shared `pages/note.html?id=...` template handles it.
5. Validate JSON, test home search/course filters and the detail link, and check mobile layout.
6. Update README only if functionality, categories, or setup changes.

## How to add a course
1. Choose a short consistent course name and color class.
2. Add notes with that course name.
3. Update the course list in `script.js` and associated color styles in `style.css`.
4. Verify the course filter, note counts, and all links.

## Rules for AI edits
- Preserve existing content and URLs unless explicitly asked to change them.
- Never silently delete or overwrite notes.
- Keep JavaScript small and readable, with meaningful variable names.
- Render user-facing note text with `textContent`, not `innerHTML`, to avoid injecting HTML.
- Do not add dependencies, analytics, trackers, or remote assets without permission.
- Do not hardcode repository names or absolute `/` paths.
- Check accessibility (semantic headings, keyboard access, contrast) and responsive behavior.
- After changes, explain which files changed and how to verify the result.

## Definition of done
A change is complete when JSON parses, the home page loads, filters/search work, detail pages display the correct note, back navigation works, and the site is usable on mobile and GitHub Pages.
