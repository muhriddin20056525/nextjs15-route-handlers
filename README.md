| Mundarija                                      |
| ---------------------------------------------- |
| [1-dars Route Handlers][1-dars]                |
| [2-dars Handling GET Requests][2-dars]         |
| [3-dars Handling POST Requests][3-dars]        |
| [4-dars Dynamic Route Handlers][4-dars]        |
| [5-dars Handling PATCH Requests][5-dars]       |
| [6-dars Handling DELETE Requests][6-dars]      |
| [7-dars URL Query Parameters][7-dars]          |
| [8-dars Headers in Route Handlers][8-dars]     |
| [9-dars Cookies in Route Handlers][9-dars]     |
| [10-dars Redirects in Route Handlers][10-dars] |
| [11-dars Caching in Route Handlers][11-dars]   |
| [12-dars Middleware][12-dars]                  |

[1-dars]: https://github.com/muhriddin20056525/nextjs15-route-handlers?tab=readme-ov-file#1-dars-route-handlers
[2-dars]: https://github.com/muhriddin20056525/nextjs15-route-handlers?tab=readme-ov-file#2-dars-handling-get-requests
[3-dars]: https://github.com/muhriddin20056525/nextjs15-route-handlers?tab=readme-ov-file#3-dars-handling-post-requests
[4-dars]: https://github.com/muhriddin20056525/nextjs15-route-handlers?tab=readme-ov-file#4-dars-dynamic-route-handlers
[5-dars]: https://github.com/muhriddin20056525/nextjs15-route-handlers?tab=readme-ov-file#5-dars-handling-patch-requests
[6-dars]: https://github.com/muhriddin20056525/nextjs15-route-handlers?tab=readme-ov-file#6-dars-handling-delete-requests
[7-dars]: https://github.com/muhriddin20056525/nextjs15-route-handlers?tab=readme-ov-file#7-dars-url-query-parameters
[8-dars]: https://github.com/muhriddin20056525/nextjs15-route-handlers?tab=readme-ov-file#8-dars-headers-in-route-handlers
[9-dars]: https://github.com/muhriddin20056525/nextjs15-server?tab=readme-ov-file#9-dars-cookies-in-route-handlers
[10-dars]: https://github.com/muhriddin20056525/nextjs15-server?tab=readme-ov-file#10-dars-redirects-in-route-handlers
[11-dars]: https://github.com/muhriddin20056525/nextjs15-server?tab=readme-ov-file#11-dars-caching-in-route-handlers
[12-dars]: https://github.com/muhriddin20056525/nextjs15-server?tab=readme-ov-file#12-dars-middleware

---

# **Nextjs 15 Route Handlers**

`Route Handler` bu `API` endpointlarini yaratish uchun ishlatiladigan funksiya bo‘lib, u `App Router` (app papkasi) ichida joylashgan bo‘ladi.

- Route Handler asosiy xususiyatlari:
  - Serverda ishlaydi (faqat backendda)
  - `GET`, `POST`, `PUT`, `DELETE` kabi `HTTP` metodlarni qo‘llab-quvvatlaydi
  - `Response` va `Request` obyektlaridan foydalanadi
  - `Middleware` kabi ishlashi mumkin
  - `Edge` va `Serverless` funksiyalarni qo‘llab-quvvatlaydi

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

---

# **4-dars Dynamic Route Handlers**

`Dynamic Route Handlers` Next.js'da URL'dagi o‘zgaruvchan (dinamik) qiymatlar bilan ishlash uchun ishlatiladi. Masalan, har xil ID, username yoki slug'ga qarab ma'lumotni olish, yangilash yoki o‘chirish kerak bo‘lsa, aynan shu handlerlar kerak bo‘ladi. Bu orqali har bir foydalanuvchi yoki mahsulot uchun alohida route yozish shart bo‘lmaydi — bitta dynamic route hammasini qamrab oladi. Ular asosan API endpointlarda yoki sahifa (page) URL'larida mos ma'lumotni ko‘rsatish uchun xizmat qiladi.

```ts
// app/comments/[id]/route.ts

import { comments } from "../data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const comment = comments.find((comment) => comment.id === parseInt(id));
  return Response.json(comment);
}
```

- Dynamic routelar `[]` qavslar ichida ochiladi
- `[id]` bu mahsulotning id sini olish uchun ishlatiladi
- `http://localhost:300/comments/1` bu apiga so'rov yuborish endpoint bo'ladi oxiridagi `1` bu id
- `{ params }: { params: Promise<{ id: string }> }` - `[id]` id ni paramsga saqlaydi bu usul bilan type berib paramsdan id ni chiqarib olish mumkin funksiyaning parametri orqali

---

# **5-dars Handling PATCH Requests**

`PATCH` so'rovi HTTP protokolida ma'lumotlarni qisman yangilash uchun ishlatiladi. Bu metod resursning to'liq qayta yozilishi o'rniga faqat kerakli qismlarini yangilashga imkon beradi. Masalan, foydalanuvchi ma'lumotlarini yangilashda, faqat bir nechta maydonni o'zgartirish kerak bo'lsa, PATCH so'rovi samarali va resursni tejashga yordam beradi. Bu usul, ayniqsa katta ma'lumotlar bazasi bilan ishlaganda yoki faqat kichik o'zgarishlar qilishda foydalidir.

```tsx
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();
  const { text } = body;

  const index = comments.findIndex((comment) => comment.id === parseInt(id));
  comments[index].text = text;
  return Response.json(comments[index]);
}
```

`export async function PATCH(request, { params })`:

- `PATCH` — bu PATCH so'rovini ishlov berish uchun ishlatilgan metod.
- `request: Request` — bu request obyektini olish uchun parametr, unda so'rovning ma'lumotlari (masalan, JSON body) bo'ladi.
- `{ params }: { params: Promise<{ id: string }> }` — bu yerda params dinamik URL parametrlari (masalan, `id`) sifatida uzatiladi va ular `Promise` sifatida qaytariladi. Bu `id` qiymati kerak bo'lganda olinadi.

`const { id } = await params;`:

- `params` o'zgaruvchisidan `id` ni olish uchun `await` ishlatilgan. Bu `id` URL-dan olinadi va u foydalanuvchining qaysi `comment`ni yangilashini belgilaydi.

`const body = await request.json();`:

- So'rovning body qismini olish uchun `request.json()` metodi ishlatiladi. Bu metod JSON formatidagi ma'lumotni olib, uni JavaScript obyektiga aylantiradi.

`const { text } = body;`:

- JSON body'dan `text` ma'lumotini olish. Bu foydalanuvchi tomonidan yuborilgan yangilangan matnni anglatadi.

`const index = comments.findIndex((comment) => comment.id === parseInt(id));`:

- `comments` massivida `id` qiymati bilan teng bo'lgan `comment`ni topish uchun `findIndex` metodi ishlatilgan. `id` ni `parseInt` orqali sonli qiymatga o'zgartirganimiz sababli, `comments` massividagi `id` bilan solishtiriladi.

`comments[index].text = text;`:

- `comments` massividagi topilgan `comment`ni yangilash. `index` orqali topilgan elementning `text` maydoni yangilanadi, ya'ni foydalanuvchi tomonidan yuborilgan yangi `text` qiymati bilan almashtiriladi.

`return Response.json(comments[index]);`:

- Yangilangan `comment`ni JSON formatida javob sifatida qaytaradi. Bu foydalanuvchiga yangilangan ma'lumotni yuboradi.

---

# **6-dars Handling DELETE Requests**

`DELETE` request ma’lumotni serverdan o‘chirish uchun ishlatiladi.
Masalan, foydalanuvchi postni o‘chirmoqchi bo‘lsa, `DELETE` so‘rov yuboradi.
Backend ushbu so‘rovni qabul qilib, kerakli ma’lumotni bazadan o‘chiradi.

```tsx
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const index = comments.findIndex((comment) => comment.id === parseInt(id));
  const deletedComment = comments[index];
  comments.splice(index, 1);

  return Response.json(deletedComment);
}
```

- `export async function DELETE(_request: Request,{ params }: { params: Promise<{ id: string }> })` - DELETE request ochish
- `const { id } = await params;` - paramsdan `id` ni olish
- `const index = comments.findIndex((comment) => comment.id === parseInt(id));` - Bu yerda id bo‘yicha mos comment qidiriladi va uning indeks raqami topiladi.
- `const deletedComment = comments[index];` - Topilgan comment vaqtincha deletedComment nomli o‘zgaruvchida saqlanadi.
- `comments.splice(index, 1);` - Bu qator index bo‘yicha massivdan bitta elementni o‘chiradi.
- `return Response.json(deletedComment);` O‘chirilgan comment JSON shaklida qaytariladi.

---

# **7-dars URL Query Parameters**

`query parametr` — bu URL orqali komponentga ma’lumot yuborish usuli. Ular ?name=Ali&age=25 kabi ko‘rinishda bo‘ladi. Masalan, /users?id=123 orqali id qiymatini olish mumkin. Ular sahifalarni dinamik qilish, filtr, qidiruv yoki sahifalash (pagination) uchun ishlatiladi. useSearchParams yoki useRouter().query orqali o‘qiladi.

```tsx
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  const filteredComments = query
    ? comments.filter((comment) => comment.text.includes(query))
    : comments;

  return Response.json(filteredComments);
}
```

- `NextRequest` — URL, headers va boshqa ma'lumotlarni o‘z ichiga oladi.
- `request.nextUrl.searchParams` - orqali `URL`'dagi `query` parametrlarga murojaat qilinmoqda. Masalan: `/comments?query=salom`
- `query` - deb nomlangan parametr qiymati olinadi. Masalan, yuqoridagi misolda `query = "salom"` bo‘ladi.

---

# **8-dars Headers in Route Handlers**

`Headers in Route Handlers` — bu server tarafda yozilgan `route handler` larda so'rov (`request`) yoki javob (`response`) `header` larini boshqarish imkonini beradi.

- So‘rovdan maxsus `header` ma’lumotlarini olish (masalan, `Authorization`)
- Javobga kerakli `header` qo‘shish (masalan, `Set-Cookie, Content-Type`)
- `CORS` yoki `cache` boshqaruvi uchun `header` lar bilan ishlash

```tsx
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  console.log(requestHeaders.get("Authorization"));

  return new Response("Profile API Data");
}
```

- ` const requestHeaders = new Headers(request.headers);`
  - `requestning` headerlarini `Headers` obyektiga o‘tkazadi. Bu orqali header'larga osonroq murojaat qilish mumkin.
- `console.log(requestHeaders.get("Authorization"));`
  - So‘rovdagi `Authorization` `header` qiymatini konsolga chiqaradi. Bu ko‘pincha `token` yoki `login` ma’lumotlarini tekshirish uchun ishlatiladi.
- `return new Response("Profile API Data");`
  - Foydalanuvchiga `"Profile API Data"` degan matnli javob (`Response`) qaytaryapti.

```tsx
import { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
  const headerList = await headers();
  console.log(headerList.get("Authorization"));

  return new Response("Profile API Data");
}
```

- `import { headers } from "next/headers";`
  - Bu funksiya yordamida `server` komponent yoki `route handler` ichida so‘rov (`request`) headerlariga kirish mumkin.
- `const headerList = await headers();`
  - `headers()` funksiyasi orqali so‘rovdagi barcha header'lar olinadi
- `console.log(headerList.get("Authorization"));`
  - `Authorization` header qiymatini konsolga chiqaradi.

```tsx
export async function GET(request: NextRequest) {
  return new Response("<h1>Profile API Data</h1>", {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
```

- ` return new Response("<h1>Profile API Data</h1>", {`
  - `Response` qaytarilmoqda va javobning ichida `<h1>` HTML elementi bor. Ya'ni, bu `HTML` ko‘rinishida matn yuborilmoqda.
- `headers: {"Content-Type": "text/html"}`
  - `Content-Type` ni `text/html` deb belgilayapmiz. Bu brauzerga `“bu javob HTML formatda”` ligini bildiradi. Aks holda, brauzer uni oddiy matn deb o'qishi mumkin edi.

---

# **9-dars Cookies in Route Handlers**

`Cookies` — bu foydalanuvchi brauzerida ma'lumotlarni saqlash uchun ishlatiladigan usul. U asosan foydalanuvchini aniqlash (masalan, login holatini saqlash), til yoki mavzu kabi foydalanuvchi sozlamalarini eslab qolish uchun kerak bo'ladi. Server komponentlarida ham cookie’ni o‘qish va yozish mumkin (cookies() funksiyasi orqali).

```tsx
export async function GET(request: NextRequest) {
  return new Response("<h1>Profile API Data</h1>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "theme=dark",
    },
  });
}
```

- `"Set-Cookie": "theme=dark",` - Bu kod cookini frontendga yuboradi

```tsx
export async function GET(request: NextRequest) {
  const theme = request.cookies.get("theme");
  console.log(theme);

  return new Response("<h1>Profile API Data</h1>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "theme=dark",
    },
  });
}
```

- `const theme = request.cookies.get("theme");` - cookieni backendda olish

```tsx
export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.set("resultsPerPage", "20");
  console.log(cookieStore.get("resultsPerPage"));

  return new Response("<h1>Profile API Data</h1>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "theme=dark",
    },
  });
}
```

- `const cookieStore = await cookies();` - cookies() funksiyasi chaqirish.
- `cookieStore.set("resultsPerPage", "20");`
  - `cookieStorega` yangi `cookie` yozilmoqda.
  - `"resultsPerPage"` bu cookie kaliti (nomi).
  - `"20"` esa qiymati
- `console.log(cookieStore.get("resultsPerPage"));`
  - `get()` metodi `cookieStore` ichidan kerakli kalitdagi (bu holatda `"resultsPerPage"`) qiymatni qaytaradi.

---

# **10-dars Redirects in Route Handlers**

`Redirect` — bu foydalanuvchini bir URL'dan boshqasiga avtomatik yo‘naltiruvchi funksiyadir. Masalan, `/old-page` ga kirgan foydalanuvchi avtomatik ravishda `/new-page` ga yuboriladi. Bu foydalanuvchini noto‘g‘ri yoki eskirgan sahifalarda qoldirmaslik uchun ishlatiladi

```tsx
import { redirect } from "next/navigation";

export async function GET() {
  redirect("/api/v2/users");
}
```

- `import { redirect } from "next/navigation";` - Redirectni import qilish
- `redirect("/api/v2/users");`
  - Bu yerda foydalanuvchi avtomatik ravishda `/api/v2/users` URL manziliga yonaltiriladi.
  - Ya'ni `/api/v1/users` ga kirgan foydalanuvchi endi `/api/v2/users` manziliga o'tkaziladi.

---

# **11-dars Caching in Route Handlers**

`Caching in Route Handlers` — bu route handler `(faqat GET requestda)` ichida cachingni boshqarish imkoniyatidir. Bu orqali siz route handler'laringizda javobni (response) brauzer, CDN yoki server darajasida cache qilishingiz mumkin.

```tsx
export const dynamic = "force-static";

export async function GET() {
  return Response.json({ time: new Date().toLocaleTimeString() });
}
```

- `export const dynamic = "force-static";`
  - `"force-static"` bu sahifa statik tarzda oldindan yaratiladi va dynamic rendering ishlatilmaydi
  - bu endpoint birinchi marta server ishga tushganda (yoki build paytida) generatsiya qilinadi va keyin o‘zgarmaydi. Hamma so‘rovga bitta javob qaytadi.

```tsx
export const dynamic = "force-static";
export const revalidate = 10;

export async function GET() {
  return Response.json({ time: new Date().toLocaleTimeString() });
}
```

- `export const revalidate = 10;`
  - bu sahifa (yoki API javobi) har 10 soniyada bir marta yangilanadi.
- ushbu kodlar ishlashi uchun avval `npm run build` ba keyin `npm run start` orqali production mode da ishga tushirish kerak developer modeda emas

---

# **12-dars Middleware**

`Middleware` — bu Next.js’dagi o‘rtadagi funksiyadir, ya'ni foydalanuvchi biror sahifani so‘raganda, sahifa ko‘rsatilishidan oldin ishlaydigan kod.

- User `login` qilganmi yoki yo‘qmi — tekshiradi.

- `URL` ni tekshirib boshqa sahifaga yo‘naltiradi.

- `Cookie`, `token`, `til` sozlamalarini tekshiradi.

- `middleware.ts` yoki `middleware.js` fayli `root` papkada (ya’ni `app/` papkasi tashqarisida) bo‘ladi.

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/profile",
};
```

- `export function middleware(request: NextRequest) {` - middleware funksiya elon qilish
- `return NextResponse.redirect(new URL("/", request.url));`
  - foydalanuvchini bosh sahifaga `(/)` yo‘naltiradi (`redirect`).
- `new URL("/", request.url) degani:`

  - So‘rovning domenini saqlab qoladi (masalan: `http://localhost:3000/profile` → `http://localhost:3000/`)
  - Faqat yo‘l (`pathname`) ni `/` ga o‘zgartiradi.

- `matcher: "/profile"` — degani, faqat `/profile` sahifasiga kirganda middleware ishga tushadi.

```ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/profile") {
    return NextResponse.redirect(new URL("/hello", request.nextUrl));
  }
}
```

- `request.nextUrl.pathname` foydalanuvchi qaysi sahifaga kirayotganini tekshiradi.
- `new URL("/hello", request.nextUrl)`
  - foydalanuvchi kirgan sahifani `/hello` ga o'zgartiradi
