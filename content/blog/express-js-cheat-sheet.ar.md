---
title: "دليل Express.js الأساسي"
description: "دليل عملي لبناء REST APIs باستخدام Express.js — يغطي الإعداد، الكائنات الأساسية، الـ middleware، والـ routing."
date: "2026-07-20"
---

سواء كنت مبتدئ أو تحتاج مراجعة سريعة، هذا الدليل يغطي المفاهيم الأساسية لبناء REST APIs باستخدام Express. مرجع ممتاز تحتفظ بيه لمشروع Node.js الجاي.

## ما هو Express.js؟

Express هو إطار عمل سريع وغير متشدد لـ Node.js. بسيط لكن قوي، مبني على الـ middleware (كل شيء هو دالة في دورة الطلب → الاستجابة)، ومثالي لبناء REST APIs وتطبيقات كاملة.

الإصدار الخامس من Express يضيف دعم async/await مباشرة في الـ middleware والـ routes، مما يسهل التعامل مع الأخطاء في الكود غير المتزامن.

## التثبيت والإعداد

```bash
npm init -y
npm install express@5
```

```javascript
// server.js
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express v5");
});

app.listen(3000, () => console.log("Server running on 3000"));
```

## الكائن الأساسي – app

app هو تطبيق Express الرئيسي تاعك. هنا تربط الـ middleware وتعرف الـ routes.

```javascript
app.use(middleware);        // ربط middleware
app.get("/", handler);      // معالجة GET
app.set("view engine", "ejs"); // إعدادات
app.listen(3000);           // تشغيل السيرفر
```

## الكائن الأساسي – req (الطلب)

الكائن req يمثل الطلب الوارد من العميل. هنا تلقى كل شيء يرسله المستخدم للسيرفر.

```javascript
app.get("/user/:id", (req, res) => {
  console.log(req.params.id);   // معامل URL
  console.log(req.query.q);     // query string
  console.log(req.headers);     // الترويسات
});
```

## الكائن الأساسي – res (الاستجابة)

الكائن res هو كيفاش السيرفر يرد على العميل. تنجم ترسل نص، JSON، ملفات، أو حتى تحول المستخدم لصفحة أخرى.

```javascript
res.send("Hello");             // نص/HTML
res.json({ ok: true });        // JSON
res.status(404).send("Not Found");
res.redirect("/login");
```

## أساسيات الـ Middleware

الـ middleware هي سلسلة الدوال التي يمر بيها الطلب قبل ما يتبعث الرد. تقعد بين الطلب والاستجابة.

```javascript
// middleware مدمج
app.use(express.json());          // قراءة JSON body
app.use(express.static("public")); // خدمة الملفات الثابتة

// middleware مخصص
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next(); // مرر للدالة التالية
});
```

كل دالة middleware عندها access لـ req وres وnext — استدعاء next() يمرر التحكم للدالة التالية في السلسلة. إذا نسيتها، الطلب يقعد معلق للأبد.

## Middleware من أطراف ثالثة

توجد منظومة كاملة من الـ middleware تنجم تستعملها: express.json() لقراءة JSON، express.urlencoded() لقراءة الفورمات، helmet لترويسات الأمان، morgan للتسجيل، وcors لطلبات cross-origin.

```javascript
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
```

دمج هذوما يعطيك قاعدة جاهزة للإنتاج: تسجيل الطلبات، ترويسات أمان معقولة، وتحكم في الوصول من مصادر مختلفة، كل هذا في ثلاثة أسطر.

## أساسيات الـ Routing

الـ routing هو كيفاش تطبيقك يقرر شنوة يدير وقت ما طلب يوصل لـ URL معين. تقول لـ Express: "إذا شخص زار هذا المسار بهذه الطريقة HTTP، شغل هذه الدالة."

```javascript
app.get("/", (req, res) => res.send("GET Home"));
app.post("/data", (req, res) => res.json(req.body));
app.put("/user/:id", (req, res) =>
  res.send("Updated " + req.params.id));
app.delete("/user/:id", (req, res) =>
  res.send("Deleted " + req.params.id));
```

معًا، GET وPOST وPUT وDELETE تتطابق بشكل طبيعي مع العمليات الأربعة الأساسية لـ REST API: القراءة، الإنشاء، التحديث، والحذف.

## خلاصة

هذا هو جوهر Express باختصار: كائن app لإعداد السيرفر، req/res للتواصل مع العملاء، middleware لمعالجة الطلبات في سلسلة، وrouting لتحديد شنوة يتشغل وين. احتفظ بهذا الدليل لمشروع Node.js الجاي.
