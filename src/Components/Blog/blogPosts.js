export const blogPosts = [
  {
    slug: "race-condition-store-creation",
    date: "2026-07-15",
    tags: ["Supabase", "React Native", "Async"],
    title: {
      en: "Fixing a Race Condition in Store Creation with Supabase",
      ar: "إصلاح مشكل Race Condition عند إنشاء المتجر مع Supabase",
    },
    description: {
      en: "How I found and fixed an intermittent bug in HiSabi's store creation flow, and the retry pattern that solved it for good.",
      ar: "كيف اكتشفت وصلحت خطأ متقطع في عملية إنشاء المتجر في HiSabi، والحل اللي خلص المشكل نهائيًا.",
    },
    content: {
      en: [
        { type: "heading", text: "The Context" },
        {
          type: "paragraph",
          text: "While building HiSabi, a multi-tenant POS app for retail shops, I ran into an intermittent bug during the store creation flow. Occasionally, when a new owner signed up, the app would throw an error or leave the user in a broken state — but only sometimes. Race conditions are frustrating exactly because of that: they don't fail every time.",
        },
        { type: "heading", text: "The Problem" },
        {
          type: "paragraph",
          text: "Store creation involved multiple async steps: creating the Supabase Auth user, creating the store record, then linking them. Under a slightly slower network response, the app would try to read the store record before it had actually finished being written. The result was a null reference or an incomplete object used downstream.",
        },
        { type: "heading", text: "What I Tried First (and Why It Failed)" },
        {
          type: "paragraph",
          text: "My first instinct was to add a fixed delay before reading the store data. This 'fixed' it in testing, but it's a fragile solution — it just makes the bug less likely, not impossible. On a slower connection, the same problem would resurface. If you're new to async programming, this is the trap to avoid: never assume how long something will take.",
        },
        { type: "heading", text: "The Actual Fix" },
        {
          type: "paragraph",
          text: "Instead of guessing a delay, I built a retry loop with exponential backoff: after creating the store, the app tries to fetch it. If the fetch fails because the record isn't available yet, it waits briefly and tries again, up to a fixed number of attempts.",
        },
        {
          type: "code",
          language: "javascript",
          code: `async function fetchStoreWithRetry(storeId, maxAttempts = 5) {
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
}`,
        },
        { type: "heading", text: "Why It Works" },
        {
          type: "paragraph",
          text: "This approach doesn't assume how long the database write will take — it reacts to the actual state of the system. On a fast connection, it succeeds on the first attempt with no perceptible lag. On a slower one, it retries automatically without failing the whole signup flow.",
        },
        { type: "heading", text: "If You're Just Starting Out" },
        {
          type: "paragraph",
          text: "The core lesson here isn't specific to Supabase: whenever you write data and then immediately need to read it back, don't trust a fixed delay. Check for success and retry if needed. This single pattern will save you from a whole category of bugs that only show up 'sometimes' — which are the hardest kind to debug.",
        },
      ],
      ar: [
        { type: "heading", text: "السياق" },
        {
          type: "paragraph",
          text: "أثناء بنائي لـ HiSabi، تطبيق نقطة بيع (POS) متعدد المتاجر لمحلات التجزئة، صادفت خطأ متقطع في عملية إنشاء المتجر. أحيانًا، لما صاحب متجر جديد يسجل، التطبيق يعطي خطأ أو يبقى المستخدم في حالة غير مكتملة — لكن مش دايمًا. مشاكل الـ Race Condition محبطة بالضبط لهذا السبب: ما تفشلش في كل مرة.",
        },
        { type: "heading", text: "المشكل" },
        {
          type: "paragraph",
          text: "عملية إنشاء المتجر كانت فيها عدة خطوات غير متزامنة (async): إنشاء حساب Supabase Auth، إنشاء سجل المتجر، وبعدين ربطهم. مع اتصال شبكة أبطأ شوية، التطبيق كان يحاول يقرا سجل المتجر قبل ما يخلص كتابته فعليًا. النتيجة: قيمة null أو كائن غير مكتمل يستعمل في الخطوات التالية.",
        },
        { type: "heading", text: "أول حل جربته (وليش ما خدمش)" },
        {
          type: "paragraph",
          text: "أول حاجة فكرت فيها كانت إضافة تأخير ثابت (delay) قبل قراءة بيانات المتجر. هذا 'صلح' المشكل في الاختبار، لكنه حل هش — بس يخلي المشكل أقل احتمالًا، مش مستحيل. مع اتصال أبطأ، نفس المشكل يرجع يبان. إذا كنت جديد في البرمجة غير المتزامنة، هذا الفخ اللي لازم تتجنبه: ما تفترضش أبدًا كم من وقت راح تاخذ عملية معينة.",
        },
        { type: "heading", text: "الحل الحقيقي" },
        {
          type: "paragraph",
          text: "بدل ما نخمن مدة التأخير، بنيت حلقة إعادة محاولة (retry loop) بتأخير متزايد: بعد إنشاء المتجر، التطبيق يحاول يجيبه. إذا فشلت المحاولة لأن السجل مازال ما توصلش، ينتظر شوية ويحاول من جديد، لحد عدد محاولات محدد.",
        },
        {
          type: "code",
          language: "javascript",
          code: `async function fetchStoreWithRetry(storeId, maxAttempts = 5) {
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
}`,
        },
        { type: "heading", text: "ليش يخدم" },
        {
          type: "paragraph",
          text: "هذي الطريقة ما تفترضش كم من وقت راح تاخذ عملية الكتابة في قاعدة البيانات — هي تتفاعل مع الحالة الحقيقية للنظام. مع اتصال سريع، تنجح من المحاولة الأولى بلا أي تأخير محسوس. مع اتصال أبطأ، تعاود المحاولة تلقائيًا بلا ما تفشل عملية التسجيل كاملة.",
        },
        { type: "heading", text: "إذا كنت مبتدئ" },
        {
          type: "paragraph",
          text: "الدرس الأساسي هنا مش خاص بـ Supabase بس: كل مرة تكتب بيانات وبعدين تحتاج تقراها فورًا، ما تثقش في تأخير ثابت. تأكد من النجاح وأعد المحاولة إذا احتجت. هذا النمط الوحيد راح يوفرلك فئة كاملة من الأخطاء اللي تبان 'أحيانًا بس' — وهاذوما أصعب نوع أخطاء تصلحه.",
        },
      ],
    },
  },
];
