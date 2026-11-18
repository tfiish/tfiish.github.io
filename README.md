# tfiish.github.io

A fish at the root, a page linking to side projects, and the pages of a project that needs a home. Edit the HTML and push to `main`; GitHub Pages serves it at https://tfiish.github.io. Pages builds it with Jekyll, but the pages are plain HTML with no front matter, so each is served as written. `_config.yml` keeps this file, `AGENTS.md`, and `tools/` off the site; any new note for the repo alone joins its `exclude` list, or it's public.

| Path | What it is | URL |
| --- | --- | --- |
| `index.html` | The home page: the fish, and nothing else | https://tfiish.github.io/ |
| `projects/index.html` | The side-projects list, with its screenshots in `projects/img/` | https://tfiish.github.io/projects/ |
| `sleeksleep/index.html` | SleekSleep's support page | https://tfiish.github.io/sleeksleep/ |
| `sleeksleep/privacy/index.html` | SleekSleep's privacy policy | https://tfiish.github.io/sleeksleep/privacy/ |

`favicon.svg` and `fish.png` are the fish, used by the home page and the projects page.

## The home page and the projects list

The list moved from the root to `/projects/` on 2026-11-05, so that someone who trims a SleekSleep URL back to the domain finds only the fish. The home page doesn't link to the list. Both pages share the theme saved in the browser, but the home page always uses the arcade colors the fish is drawn in.

## The tfiish card's screenshot

The tfiish card on the projects page shows a picture of the projects page, which holds that same card, so the picture nests inside itself. Retake it whenever the page's header, toolbar, or the tfiish card changes:

```sh
cd tools
npm install
npm run shot
```

`tools/shot-tfiish.mjs` serves the working copy, opens it in the installed Google Chrome (set `CHROME` to a browser's path to use another), and writes `projects/img/tfiish.webp`. Each shot has the same framing:

- **Arcade theme**, a 1440×900 window at 2x, scaled to 1600×1000, the size the card's `<img>` gives.
- **tfiish as the fourth card.** The first three other cards in page order show above it, collapsed; the rest are hidden. tfiish is open, with Managing closed, and the page is scrolled so its card ends just above the bottom.
- **Nested all the way down.** The script takes four passes, each with the last pass's picture on the page, so every level of the nesting shows the current page rather than an older one.

The subheader's time comes from GitHub's latest commit on `main`, so it shows the commit before the one that adds the new picture. If GitHub doesn't answer, the script says so and the subheader shows the date alone; run it again later. Check the picture before committing it.

## SleekSleep

SleekSleep is an iPhone app whose own repo, `tfiish/sleeksleep`, is private, and Pages on a private repo needs a paid plan, so its two pages live here. They moved here on 2026-11-05 from `tfiish/sleeksleep-site`, which is retired, with no redirects.

- **Don't name tfiish.** SleekSleep's pages don't credit tfiish or link to the rest of this site; the domain is only where they're hosted, and the only place tfiish appears. The contact address is `sleeksleep.app@outlook.com`. The pages use the app's icon, `sleeksleep/icon.svg`, not the fish.
- **Keep these paths.** The app's Settings links to both pages, and the App Store listing will. A renamed folder or a broken page is a 404 that App Review rejects and the app can't detect. The app repo's SPEC §7 holds the URLs.
- **Keep the policy true.** It should match what the app's SPEC §1 and §4.5 say the app keeps. When it changes, update its "Last updated" date.
- **Don't turn on Pages for `tfiish/sleeksleep`.** A project site of that name would take over `/sleeksleep/` and hide this folder.
- `sleeksleep/style.css` styles both pages. They follow the system's light or dark setting rather than the projects page's theme button.
