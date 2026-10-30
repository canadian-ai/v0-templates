# Public v0 community template preview reproduction

**Independent Canadian AI reference implementation. Not an official Vercel/v0 SDK project.**

The documented `v0.chats.getPreview({ chatId })` requires an accessible chat. A public community catalog supplies a `templateId` instead. This sample illustrates that SDK gap and a deliberately narrow, security-conscious public-deployment fallback.

## Demo

A static interactive explorer runs on Vercel using `public/index.html` and `api/preview.js`. Four known public template IDs can be checked. The server only looks for explicit public `*.vercel.app` deployments and checks basic iframe restrictions. If no deployment is found, the UI reports an honest fallback, not an invented renderer or screenshot.

## Quick start

```bash
npm test
npm run repro:catalog
```

No credentials or dependencies are needed for offline tests (Node 20+). `repro:catalog` makes live requests to the four public v0 template pages; upstream availability can change.

## Files

- `src/public-template-preview.mjs`: minimal public HTML fallback resolver, typed states, and simple embed policy checks
- `api/preview.js`: rate-limited-by-scope demo API (four allowlisted public IDs, cached response)
- `public/index.html`: interactive, responsive read-only inspector
- `tests/public-template-preview.test.mjs`: nine offline behavior/safety tests
- `docs/UPSTREAM_ISSUE.md`: copy-ready upstream SDK feature request
- `SECURITY.md`: limitations and security guidance

This does not use undocumented v0 frame tokens, bypass CSP, scrape private assets, or publish Canadian AI's private code. Browser iframe policy ultimately determines whether a public deployment can be embedded.

## Requested SDK feature

A supported, documented public `templateId` to preview resolver, with publisher permissions and typed availability states. An official import/duplicate-and-preview workflow would also be useful.

MIT licensed. © 2026 Canadian AI.
