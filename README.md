# NameForge

> Describe a startup idea and get ten name candidates, each with a tagline and a domain suggestion.

**[Live demo](https://startupnames-mlx.vercel.app)**

Naming a company usually starts as a blank page and ends as a browser full of domain checkers. NameForge takes a plain-English description of what you're building, plus an optional industry and vibe, and asks Groq's Llama 3.3 70B for ten distinct candidates. Each name comes back with a tagline, a suggested domain, and a short explanation of why it fits — so candidates can be judged on stated reasoning rather than gut feel alone.

## Features

- Free-text idea description drives the generation
- Optional industry selector: Tech, Health, Finance, Education, Food, Travel, Social, Gaming, Other
- Optional vibe selector: Professional, Playful, Bold, Minimal, Techy
- Ten results per run, each with name, tagline, domain suggestion, and rationale
- Copy any name to the clipboard in one click
- Model called in JSON response mode for consistently parseable output

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- Groq API — `llama-3.3-70b-versatile`

## Running locally

```bash
npm install
npm run dev
```

Set `GROQ_API_KEY` in `.env.local`.

---

Part of a series of 91 small web apps. [Browse them all](https://lorenzoylosada.vercel.app).
