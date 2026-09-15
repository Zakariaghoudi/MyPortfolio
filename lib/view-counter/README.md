# view-counter

Reusable, deduped, atomic view/hit counter. Backend (serverless) +
frontend (React hook). Not tied to any specific project — copy this
whole folder into a new codebase and it works.

## Setup (once per project)

1. `npm install @upstash/redis`
2. Add a Redis integration (Upstash, via Vercel Marketplace, or your
   own upstash.com account) so these env vars exist:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

## Wire up the API route

Create `api/views.js` in the project root:

```javascript
export { default } from "../lib/view-counter/api-handler"
```

That's it — zero-config. If this project shares one Redis instance
with other projects, prevent key collisions:

```javascript
import { createViewCounterHandler } from "../lib/view-counter/api-handler"
export default createViewCounterHandler({ keyPrefix: "my-project-name" })
```

## Use it in a component

```javascript
import { useViewCounter } from "../../lib/view-counter/useViewCounter"

function ProductPage({ product }) {
  const views = useViewCounter(product.id)

  return (
    <div>
      <h1>{product.name}</h1>
      {views !== null && <span>👁 {views.toLocaleString()} views</span>}
    </div>
  )
}
```

Swap `product.id` for whatever unique id fits the project: a blog
slug, a page path, a video id — anything.

## How it works

- Each visitor gets a random anonymous id stored in `localStorage`
  (no IP, no personal data).
- On each view, the backend does one atomic `SET ... NX EX` in Redis:
  "set this key only if it doesn't exist, and expire it after 24h."
- Only the first view per visitor per 24h actually increments the
  count — refreshing the page doesn't inflate it.
- The check-and-write happens as a single atomic Redis command, so
  concurrent requests can't both "win" and double-count (no race
  condition).
