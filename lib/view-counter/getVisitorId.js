// lib/view-counter/getVisitorId.js
//
// REUSABLE across any project — no project-specific naming inside.

export function getVisitorId() {
  const STORAGE_KEY = "visitor_id"

  let id = localStorage.getItem(STORAGE_KEY)

  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(STORAGE_KEY, id)
  }

  return id
}
