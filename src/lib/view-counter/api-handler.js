// lib/view-counter/api-handler.js
//
// REUSABLE across any project. Drop the whole `lib/view-counter/`
// folder into a new codebase and it works with zero changes.
//
// Requires: npm install @upstash/redis
// Requires env vars (Upstash, via Vercel Marketplace or upstash.com):
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN

import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()

/**
 * Factory — call with options to customize, or use the default export
 * directly for zero-config usage.
 *
 * @param {object} [options]
 * @param {number} [options.dedupeWindowSeconds=86400] how long before the
 *   same visitor can be counted again for the same id (default: 24h)
 * @param {string} [options.keyPrefix="counter"] Redis key namespace —
 *   change per project if multiple projects share one Redis instance
 */
export function createViewCounterHandler(options = {}) {
  const dedupeWindowSeconds = options.dedupeWindowSeconds ?? 86400
  const keyPrefix = options.keyPrefix ?? "counter"

  return async function handler(req, res) {
    const { id, visitorId } = req.query

    if (!id) {
      return res.status(400).json({ error: "id is required" })
    }

    if (req.method === "POST") {
      if (!visitorId) {
        return res.status(400).json({ error: "visitorId is required" })
      }

      const dedupeKey = `${keyPrefix}:seen:${id}:${visitorId}`
      const countKey = `${keyPrefix}:count:${id}`

      // Atomic check-and-write — the pattern, not the project, is what
      // makes this reusable. Works identically for blog views, product
      // views, profile views, download counts, anything.
      const isNewView = await redis.set(dedupeKey, "1", {
        nx: true,
        ex: dedupeWindowSeconds,
      })

      if (isNewView) {
        await redis.incr(countKey)
      }

      const count = await redis.get(countKey)
      return res.status(200).json({
        count: Number(count) || 0,
        counted: Boolean(isNewView),
      })
    }

    if (req.method === "GET") {
      const countKey = `${keyPrefix}:count:${id}`
      const count = await redis.get(countKey)
      return res.status(200).json({ count: Number(count) || 0 })
    }

    return res.status(405).json({ error: "Method not allowed" })
  }
}

// Zero-config default — import this directly if you don't need to
// customize dedupeWindowSeconds or keyPrefix.
export default createViewCounterHandler()
