# v0 SDK feature request: public template preview by template ID

## Summary
The documented v0 SDK API retrieves a chat preview with v0.chats.getPreview({ chatId }), but community galleries offer public template IDs and some templates have no separately published deployment. There is no documented stable template-ID-to-preview API.

This is a feature request, not a claim that existing getPreview is broken.

## Public examples
- https://v0.app/templates/XQxxv76lK5w
- https://v0.app/templates/QcwhuXpYQUm
- https://v0.app/templates/3hZwaLtyRbc
- https://v0.app/templates/Tpxvlz16QiJ

These are public investigation candidates, not assertions that every preview fails.

## Steps to reproduce
1. Start with any public template ID from above.
2. Attempt to resolve an interactive, read-only preview without importing/copying it to your v0 account.
3. The documented v0.chats.getPreview requires a chat ID instead.
4. This repository demonstrates the narrow public deployment fallback and typed unavailable states. It never uses private APIs, guesses frame tokens or bypasses CSP.

## Expected
A documented and stable operation similar to the following ILLUSTRATIVE, NONEXISTENT API:

    v0.templates.getPreview({ templateId: "XQxxv76lK5w" })

Return a permitted, read-only embeddable preview URL with expiration information, or a typed state such as unavailable, private, not embeddable or expired.

## Acceptance criteria
- [ ] Accept a public template ID without reconstructing internal chat IDs.
- [ ] Support public templates without a separate deployment where a renderer and publisher permissions allow it.
- [ ] Provide typed status, expiration and screenshot metadata.
- [ ] Respect publisher privacy, embedding policies and tenant boundaries.
- [ ] Document refresh, limits and iframe requirements.
- [ ] Include supported older and newer template examples in SDK tests.

## Environment
Node.js 20+; TypeScript/Next.js integration. No private Canadian AI source, keys or credentials in this public repository.
