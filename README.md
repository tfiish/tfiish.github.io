# tfiish.github.io

A static page linking to side projects, plus the pages of a project that needs a home. Edit the HTML and push to `main`; GitHub Pages serves it at https://tfiish.github.io. The `.nojekyll` file turns Jekyll off, so every file is served as written: pages are plain HTML, not Markdown.

| Path | What it is | URL |
| --- | --- | --- |
| `index.html` | The side-projects page | https://tfiish.github.io/ |
| `sleeksleep/index.html` | SleekSleep's support page | https://tfiish.github.io/sleeksleep/ |
| `sleeksleep/privacy/index.html` | SleekSleep's privacy policy | https://tfiish.github.io/sleeksleep/privacy/ |

## SleekSleep

SleekSleep is an iPhone app whose own repo, `tfiish/sleeksleep`, is private, and Pages on a private repo needs a paid plan, so its two pages live here. They moved from `tfiish/sleeksleep-site` on 2026-11-05; that repo now only redirects the old URLs here.

- **Keep these paths.** The app's Settings links to both pages, and the App Store listing will. A renamed folder or a broken page is a 404 that App Review rejects and the app can't detect. The app repo's SPEC §7 holds the URLs.
- **Keep the policy true.** It should match what the app's SPEC §1 and §4.5 say the app keeps. When it changes, update its "Last updated" date.
- **Don't turn on Pages for `tfiish/sleeksleep`.** A project site of that name would take over `/sleeksleep/` and hide this folder.
- `sleeksleep/style.css` styles both pages. They follow the system's light or dark setting rather than the home page's theme button.
