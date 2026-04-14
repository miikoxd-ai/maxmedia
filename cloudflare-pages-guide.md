# Cloudflare Deployment Guide for Max Media Marketing

## Current architecture

This project is **not a static-only frontend**. It contains a React frontend plus server-side logic for content loading, admin authentication, cookies, and protected editing routes. Because of that, it is **not a drop-in fit for plain Cloudflare Pages static hosting**.

The public site can be built as frontend assets, but the current backend and password-protected admin workflow rely on runtime server behavior.

## What Cloudflare officially supports

Cloudflare Pages can run backend logic through **Pages Functions**, which execute on the Cloudflare Workers platform. Cloudflare also documents that Workers provide **partial Node.js compatibility**, and some Node-oriented packages or APIs may still need adaptation or may fail if they rely on unsupported behavior.

## What this means for this project

You currently have three realistic options.

| Option | Fit | What happens |
|---|---:|---|
| **Cloudflare Pages for frontend only** | Partial | The marketing frontend can be deployed, but the editable backend and protected admin workflow will not work without moving the APIs elsewhere. |
| **Cloudflare Pages + Pages Functions / Workers refactor** | Best Cloudflare-native path | The backend must be rewritten or adapted to Workers-compatible handlers, cookie handling, and environment configuration. |
| **Separate frontend and backend hosting** | Practical | Put the frontend on Cloudflare Pages and host the backend/admin API on a separate server platform that supports the current Node-style runtime. |

## Public site and admin separation

The public website should stay on your main host, for example:

- `https://maxmedia.com`

The admin dashboard should be isolated on a separate admin host, for example:

- `https://admin.maxmedia.com`

The correct format is **`admin.maxmedia.com`**, not `maxmedia/admin.com`.

The app has been updated so the **public host no longer exposes a public `/admin` route as part of the main website experience**. The protected dashboard is intended to live behind the admin host and still requires the dedicated dashboard password.

## If you still want Cloudflare Pages

A practical migration sequence would be:

1. Export the project code to GitHub.
2. Build the frontend separately and confirm the public site works without server-only assumptions.
3. Decide whether to:
   - rewrite backend logic into Cloudflare Pages Functions / Workers, or
   - move backend logic to a separate host.
4. Rework cookie/session behavior for the Cloudflare runtime.
5. Reconfigure secrets and environment variables in Cloudflare.
6. Bind the public custom domain to the public frontend.
7. Bind `admin.maxmedia.com` to the protected admin deployment path you choose.

## Recommended Cloudflare path for this exact project

If you want to stay with Cloudflare, the safest recommendation is:

| Layer | Recommended target |
|---|---|
| Public marketing frontend | Cloudflare Pages |
| Protected admin backend and content API | Separate Node-capable host, or a deliberate Workers refactor |
| Admin domain | `admin.maxmedia.com` |

## Important limitation

Until the backend is refactored for Cloudflare Workers compatibility, **Cloudflare Pages alone should not be treated as a full replacement for the current application runtime**.

## References

1. Cloudflare Pages Functions documentation: https://developers.cloudflare.com/pages/functions/
2. Cloudflare Workers Node.js compatibility documentation: https://developers.cloudflare.com/workers/runtime-apis/nodejs/
