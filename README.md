# tfiish.github.io

A fish at the root, a page linking to side projects, and the pages of a project that needs a home. Edit the HTML and push to `main`; GitHub Pages serves it at https://tfiish.github.io. The `.nojekyll` file turns Jekyll off, so every file is served as written: pages are plain HTML, not Markdown.

| Path | What it is | URL |
| --- | --- | --- |
| `index.html` | The home page: the fish, and nothing else | https://tfiish.github.io/ |
| `projects/index.html` | The side-projects list, with its screenshots in `projects/img/` | https://tfiish.github.io/projects/ |
| `sleeksleep/index.html` | SleekSleep's support page | https://tfiish.github.io/sleeksleep/ |
| `sleeksleep/privacy/index.html` | SleekSleep's privacy policy | https://tfiish.github.io/sleeksleep/privacy/ |

`favicon.svg` and `fish.png` are the fish, used by the home page and the projects page.

## The home page and the projects list

The list moved from the root to `/projects/` on 2026-11-05, so that someone who trims a SleekSleep URL back to the domain finds only the fish. The home page doesn't link to the list. Both pages share the theme saved in the browser, but the home page always uses the arcade colors the fish is drawn in.

## SleekSleep

SleekSleep is an iPhone app whose own repo, `tfiish/sleeksleep`, is private, and Pages on a private repo needs a paid plan, so its two pages live here. They moved here on 2026-11-05 from `tfiish/sleeksleep-site`, which is retired, with no redirects.

- **Don't name tfiish.** SleekSleep's pages don't credit tfiish or link to the rest of this site; the domain is only where they're hosted, and the only place tfiish appears. The contact address is `sleeksleep.app@outlook.com`. The pages use the app's icon, `sleeksleep/icon.svg`, not the fish.
- **Keep these paths.** The app's Settings links to both pages, and the App Store listing will. A renamed folder or a broken page is a 404 that App Review rejects and the app can't detect. The app repo's SPEC §7 holds the URLs.
- **Keep the policy true.** It should match what the app's SPEC §1 and §4.5 say the app keeps. When it changes, update its "Last updated" date.
- **Don't turn on Pages for `tfiish/sleeksleep`.** A project site of that name would take over `/sleeksleep/` and hide this folder.
- `sleeksleep/style.css` styles both pages. They follow the system's light or dark setting rather than the projects page's theme button.
