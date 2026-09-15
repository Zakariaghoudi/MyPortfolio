// lib/view-counter/useViewCounter.js
//
// REUSABLE across any React project. Works with anything you can give
// a unique id to: a blog slug, a product id, a page path, a video id.

import { useState, useEffect } from "react"
import { getVisitorId } from "./getVisitorId"

/**
 * @param {string} id unique identifier for the thing being counted
 * @param {string} [apiPath="/api/views"] path to the serverless endpoint
 * @returns {number|null} the current count, or null until the first
 *   request resolves
 */
export function useViewCounter(id, apiPath = "/api/views") {
  const [count, setCount] = useState(null)

  useEffect(() => {
    if (!id) return

    const visitorId = getVisitorId()

    fetch(`${apiPath}?id=${encodeURIComponent(id)}&visitorId=${visitorId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {}) // a counter should never break the page it's on
  }, [id, apiPath])

  return count
}
