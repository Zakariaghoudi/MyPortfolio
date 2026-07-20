---
title: "Essential Express.js Cheat Sheet"
description: "A practical guide to building REST APIs with Express.js — covering setup, core objects, middleware, and routing."
slug: express-js-cheat-sheet
date: 2026-07-20
tags: [ExpressJS, NodeJS, MERNStack, WebDevelopment, BackendDeveloper, JavaScript]
---

# Essential Express.js Cheat Sheet

Whether you're a beginner or looking for a quick refresher, this guide covers the core concepts of building REST APIs with Express. A great resource to keep handy for your next Node.js project. 🚀

## What is Express.js?

Express is a fast, unopinionated web framework for Node.js.

- **Minimal but powerful** — it gives you just enough structure without forcing a rigid architecture.
- **Middleware-based** — everything is a function in the request → response cycle.
- **Perfect for building REST APIs** and full server-rendered apps.

> 👉 Express v5 introduces async/await support directly in middleware and routes, making error handling in asynchronous code much cleaner.

## Install & Setup

Getting a server running takes just a few lines:

```bash
npm init -y
npm install express@5
```

```js
// server.js
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express v5");
});

app.listen(3000, () => console.log("Server running on 3000"));
```

That's it — you have a working HTTP server.

## Core Objects

Express revolves around three core objects you'll use constantly.

### `app`

`app` is your main Express application. It's where you plug in middleware and define routes.

```js
app.use(middleware);        // Mount middleware
app.get("/", handler);      // Handle GET
app.set("view engine", "ejs"); // Config
app.listen(3000);           // Start server
```

### `req` (Request)

The `req` object represents the incoming request from the client. This is where you'll find everything the user is sending to your server.

```js
app.get("/user/:id", (req, res) => {
  console.log(req.params.id);   // URL param
  console.log(req.query.q);     // Query string
  console.log(req.headers);     // Headers
});
```

### `res` (Response)

The `res` object is how your server talks back to the client. You can send text, JSON, files, or even redirect users.

```js
res.send("Hello");             // Text/HTML
res.json({ ok: true });        // JSON
res.status(404).send("Not Found");
res.redirect("/login");
```

## Middleware Basics

Middleware is the chain of functions that a request goes through before a response is sent. It sits between request and response.

```js
// Built-in middleware
app.use(express.json());          // Parse JSON body
app.use(express.static("public")); // Serve static files

// Custom middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next(); // pass to next handler
});
```

Every middleware function has access to `req`, `res`, and `next` — calling `next()` passes control to the next function in the chain. Forget it, and the request hangs forever.

## Third-Party Middleware

There's a whole ecosystem of middleware you can plug in. Some popular ones:

- `express.json()` → Parse JSON
- `express.urlencoded()` → Parse forms
- `helmet` → Security headers
- `morgan` → Logging
- `cors` → Cross-origin requests

```js
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
```

Combining these gives you a production-ready baseline: request logging, sane security headers, and controlled cross-origin access, all in three lines.

## Routing Basics

Routing is basically how your app decides what to do when a request hits a certain URL. You tell Express: "If someone visits this path with this HTTP method, run this function."

```js
app.get("/", (req, res) => res.send("GET Home"));
app.post("/data", (req, res) => res.json(req.body));
app.put("/user/:id", (req, res) =>
  res.send("Updated " + req.params.id));
app.delete("/user/:id", (req, res) =>
  res.send("Deleted " + req.params.id));
```

Together, `GET`, `POST`, `PUT`, and `DELETE` map naturally onto the four basic operations of a REST API: read, create, update, and delete.

## Wrapping Up

That's the core of Express in a nutshell: an `app` object to configure your server, `req`/`res` to talk to clients, middleware to process requests in a chain, and routing to decide what runs where. With just these pieces, you can build a solid REST API foundation — and layer in third-party middleware like `helmet`, `cors`, and `morgan` as your project grows.

Keep this cheat sheet handy for your next Node.js project. 💻
