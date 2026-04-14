# Cloudflare Hosting Notes

## Official findings

### Pages Functions
Cloudflare Pages Functions can add backend behavior to a Pages project by executing code on the Cloudflare network with Workers. The documentation explicitly describes Functions as a way to add authentication, form handling, middleware, and other dynamic functionality without running a dedicated server.

Source: https://developers.cloudflare.com/pages/functions/

### Node.js compatibility
Cloudflare Workers provides a subset of Node.js APIs, with some APIs fully supported, some partially supported, and some only polyfilled. Cloudflare documents that `nodejs_compat` must be enabled for broader Node compatibility, and also notes that some polyfilled methods may throw runtime errors because they are not fully implemented.

Source: https://developers.cloudflare.com/workers/runtime-apis/nodejs/

## Preliminary implication for this project
This Max Media project uses a Node-oriented server runtime and protected admin/backend behavior. That means Cloudflare Pages is not a drop-in deployment target for the current app. A Cloudflare deployment would likely require either:

1. Converting the backend to Pages Functions / Workers-compatible handlers.
2. Or separating the frontend from the backend and hosting only the static frontend on Pages.
