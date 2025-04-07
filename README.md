# **Nextjs 15 Route Handlers**

`Route Handler` bu `API` endpointlarini yaratish uchun ishlatiladigan funksiya bo‘lib, u `App Router` (app papkasi) ichida joylashgan bo‘ladi.

- Route Handler asosiy xususiyatlari:
  - Serverda ishlaydi (faqat backendda)
  - `GET`, `POST`, `PUT`, `DELETE` kabi `HTTP` metodlarni qo‘llab-quvvatlaydi
  - `Response` va `Request` obyektlaridan foydalanadi
  - `Middleware` kabi ishlashi mumkin
  - `Edge` va `Serverless` funksiyalarni qo‘llab-quvvatlaydi

---

| Mundarija                              |
| -------------------------------------- |
| [1-dars Route Handlers][1-dars]        |
| [2-dars Handling GET Requests][2-dars] |

[1-dars]: https://github.com/muhriddin20056525/nextjs15-route-handlers?tab=readme-ov-file#1-dars-route-handlers
[2-dars]: https://github.com/muhriddin20056525/nextjs15-route-handlers?tab=readme-ov-file#2-dars-handling-get-requests

---

# **1-dars Route Handlers**

`Route handlers` – bu Next.js ichida `API` yaratish uchun ishlatiladigan funksiyalar bo‘lib, ular `app` papkasi ichida joylashadi. Ushbu handlerlar orqali biz `API` endpointlar yaratamiz va ularga so‘rovlar yuborishimiz mumkin.

**Misol:**
Agar biz `app/hello/route.ts` faylini yaratsak, u `http://localhost:3000/hello` manzilida ishlaydigan `API endpoint` bo‘ladi. `Brauzer` yoki `Postman` orqali ushbu URL-ga `GET` so‘rovi yuborsak, `API` tomonidan qaytarilgan ma’lumotni ko‘ramiz.

**Shuningdek, quyidagi kabi yo‘nalishlar ham API endpointlar sifatida ishlaydi:**

`app/dashboard/route.ts` → `http://localhost:3000/dashboard`

`app/dashboard/users/route.ts` → `http://localhost:3000/dashboard/users`

**Muhim farq:**

`app/profile/page.tsx` – bu sahifa bo‘lib, UI-ni aks ettiradi.

`app/profile/api/route.ts` – bu esa API endpoint bo‘lib, unga `http://localhost:3000/profile/api` manzili orqali so‘rov yuborish mumkin.

Shunday qilib, Route handlers Next.js ichida API yaratish va ularga turli so‘rovlarni yuborish imkonini beradi.

```ts
export async function GET() {
  return new Response("Hello World");
}
```

- `export async function GET()`

  - Bu yerda `GET` nomli funksiya yaratilgan.

  - `export` – bu funksiyani boshqa joyda ishlatish yoki Next.js uni avtomatik tanib olishi uchun kerak.

  - `async` – bu funksiya asinxron (`asynchronous`) ekanligini bildiradi. API handlerlar ko‘pincha ma’lumotlarni serverdan olish uchun `await` ishlatgani sababli asinxron bo‘lishi tavsiya etiladi.

- `return new Response("Hello World");`

  - `new Response()` Next.js API handler'lari uchun javob qaytarish usuli hisoblanadi.

  - `"Hello World"` – bu API javobining ichidagi oddiy matn.

Bu funksiya `app/hello/route.ts` ichida yozilgan brauzer yoki Postman orqali `http://localhost:3000/hello` manziliga `GET` so‘rovi yuborilsa, javob sifatida `"Hello World"` qaytariladi.

---

# **2-dars Handling GET Requests**

`GET Request` – bu HTTP so‘rov turi bo‘lib, serverdan ma’lumot olish uchun ishlatiladi.
Serverga so‘rov yuboriladi va u javob sifatida kerakli ma’lumotni qaytaradi (masalan, `mahsulotlar ro‘yxati`, `foydalanuvchi ma’lumotlari`).

ushbu darsda biz `comments` nomli `route` yaratdik va backendan foydalanuvchi yozgan commetnlarni qaytaradigan yani frontendga uzatadigan `api` yozdik

`/app/comments/data.ts`

```ts
export const comments = [
  {
    id: 1,
    text: "This is the first comment",
  },
  {
    id: 2,
    text: "This is the second comment",
  },
  {
    id: 3,
    text: "This is the third comment",
  },
];
```

- Bu foydalanuvchilar yozgan commentlar (`mockdata`).
- Hozircha databazaga ulanmaganligimiz sababli shundan foydalanib turamiz

`/app/comments/route.ts`

```ts
import { comments } from "./data";

export async function GET() {
  return Response.json(comments);
}
```

- Bu kod orqali `comment` `mockdata` sini javob sifatida frotendga qaytaramiz
- `export async function GET()` – Next.js API route'ida `GET` so‘rovlarini boshqarish uchun ishlatiladigan funksiya.
- `Response.json(comments)` – JSON formatida `comments` ma’lumotlarini qaytaradi.
- `return` orqali `brauzer` yoki `frontend` bu ma’lumotni olish va foydalanish imkoniyatiga ega bo‘ladi.

---

# **3-dars Handling POST Requests**

`POST request` — foydalanuvchi tomonidan serverga ma'lumot yuborish usuli. Odatda forma yuborishda ishlatiladi. Bu so‘rov ma’lumotni `URL` orqali emas, yashirin tarzda yuboradi.

```ts
import { comments } from "./data";

export async function POST(request: Request) {
  const comment = await request.json();
  const newComment = {
    id: comments.length + 1,
    text: comment.text,
  };

  comments.push(newComment);

  return new Response(JSON.stringify(newComment), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
```

- `import { comments } from "./data";`
  - Bu qator `comments` degan massivni `./data` faylidan import qiladi. comments massivida mavjud bo‘lgan sharhlar saqlanadi.
- `export async function POST(request: Request)`
  - Bu Next.js’da `POST` metodini ishlatish uchun funksiya yaratish. Bu funksiya `asinxron`, chunki `request.json()` yordamida ma'lumotlarni olish uchun vaqt kerak bo‘ladi.
- `const comment = await request.json();`
  - Bu qatorda `request.json()` metodi yordamida foydalanuvchidan yuborilgan `POST` so‘rovini JSON formatda olib keladi va uni comment o'zgaruvchisiga saqlaydi. Bu yerda foydalanuvchi yuborgan ma'lumot (masalan, izoh matni) olinadi.
- `const newComment = { id: comments.length + 1, text: comment.text };`
  - Bu yerda yangi izoh (`newComment`) yaratilyapti. `id` yangi izoh uchun avtomatik hisoblanadi — ya'ni, comments massividagi izohlar sonidan bittaga ko‘paytiriladi. text esa foydalanuvchidan yuborilgan `comment.text` qiymatidan olingan.
- `comments.push(newComment);`
  - Yangi izoh `comments` massiviga qo‘shiladi. Bu yangi izohni saqlash operatsiyasidir.
- `return new Response(JSON.stringify(newComment), { headers: { "Content-Type": "application/json" }, status: 201, });`
  - Bu qatorda `newCommentni` `JSON` formatiga o‘zgartirib (`JSON.stringify` yordamida) qaytaradi. So‘rovni muvaffaqiyatli bajargani uchun `HTTP` status kodi `201` (yaratildi) bo‘ladi. `Content-Type` sarlavhasi `application/json` bo‘ladi, bu serverning javobi JSON formatida ekanligini bildiradi.
