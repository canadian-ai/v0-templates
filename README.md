# Public v0 template preview reproduction

**Independent reference by Canadian AI; not an official Vercel/v0 product.**

A public community template is identified by a `templateId`, whereas the documented SDK method `v0.chats.getPreview({ chatId })` requires an accessible `chatId`. This project shows the integration gap and a deliberately limited public-deployment fallback.

The deployed demo tests four public template IDs. It never guesses internal chat IDs, requests undocumented frame tokens, proxies third-party HTML, or bypasses CSP. Unavailable previews are reported honestly.

## Reproduce

```bash
npm test
npm run repro:catalog
```

See `src/public-template-preview.mjs` for the minimal fallback implementation, `api/preview.js` for the bounded server-side endpoint, and `docs/UPSTREAM_ISSUE.md` for a detailed SDK feature request.

## Security

No Canadian AI private code or credentials are included. This is a demonstration, not a production preview-security implementation. Only explicitly published `*.vercel.app` deployment previews are eligible; respect the publisher's embedding policy.

MIT licensed. Made by Canadian AI.