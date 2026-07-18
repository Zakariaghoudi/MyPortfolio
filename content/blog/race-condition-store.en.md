---
title: Fixing a Race Condition in Store Creation with Supabase
description: How I found and fixed an intermittent bug in HiSabi's store creation flow, and the retry pattern that solved it for good.
date: 2026-07-15
tags: Supabase, React Native, Async
---

## The Context

While building HiSabi, a multi-tenant POS app for retail shops, I ran into an intermittent bug during the store creation flow. Occasionally, when a new owner signed up, the app would throw an error or leave the user in a broken state, but only sometimes. Race conditions are frustrating exactly because of that: they don't fail every time.

## The Problem

Store creation involved multiple async steps: creating the Supabase Auth user, creating the store record, then linking them. Under a slightly slower network response, the app would try to read the store record before it had actually finished being written. The result was a null reference or an incomplete object used downstream.

## What I Tried First and Why It Failed

My first instinct was to add a fixed delay before reading the store data. This fixed it in testing, but it is a fragile solution, it just makes the bug less likely, not impossible. On a slower connection, the same problem would resurface. If you are new to async programming, this is the trap to avoid: never assume how long something will take.

## The Actual Fix

Instead of guessing a delay, I built a retry loop with exponential backoff: after creating the store, the app tries to fetch it. If the fetch fails because the record is not available yet, it waits briefly and tries again, up to a fixed number of attempts.

```javascript
async function fetchStoreWithRetry(storeId, maxAttempts = 5) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const { data, error } = await supabase
      .from("stores")
      .select("*")
      .eq("id", storeId)
      .single();

    if (data) return data;

    if (attempt === maxAttempts) throw error;

    await new Promise((resolve) =>
      setTimeout(resolve, attempt * 300)
    );
  }
}
```

## Why It Works

This approach doesn't assume how long the database write will take, it reacts to the actual state of the system. On a fast connection, it succeeds on the first attempt with no perceptible lag. On a slower one, it retries automatically without failing the whole signup flow.

## If You Are Just Starting Out

The core lesson here isn't specific to Supabase: whenever you write data and then immediately need to read it back, don't trust a fixed delay. Check for success and retry if needed. This single pattern will save you from a whole category of bugs that only show up sometimes, which are the hardest kind to debug.
