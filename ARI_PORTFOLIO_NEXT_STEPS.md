# Ari Portfolio - Tugas Kamu Sekarang

Project code sudah disiapkan sebagai Next.js fullstack portfolio dengan Prisma, PostgreSQL/Neon, admin dashboard, contact form, dan seed data. Yang perlu kamu lakukan sekarang adalah konfigurasi environment dan database.

## 1. Buat `.env`

Copy isi `.env.example` ke file `.env`, lalu isi value asli:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST.neon.tech/DBNAME?sslmode=require"
NEXTAUTH_SECRET="isi-dengan-random-secret-panjang"
NEXTAUTH_URL="http://localhost:3000"
RESEND_API_KEY="isi-api-key-resend"
RESEND_FROM_EMAIL="Portfolio Contact <onboarding@resend.dev>"
OWNER_EMAIL="email-tujuan-pesan@example.com"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="password-admin-yang-kuat"
```

## 2. Siapkan database

Setelah `DATABASE_URL` Neon benar, jalankan:

```bash
npm run db:push
npm run db:seed
```

Seed akan membuat admin user, profile Ari, about, social links, experiences, projects, settings, dan password admin yang di-hash.

## 3. Jalankan lokal

```bash
npm run dev
```

Buka:

```txt
http://localhost:3000
http://localhost:3000/admin/login
```

Login memakai `ADMIN_EMAIL` dan `ADMIN_PASSWORD` dari `.env` saat seed dijalankan.

## 4. Cek fitur utama

- Edit Profile, About, Experiences, Projects, Social Links, dan Settings dari `/admin`.
- Kirim pesan dari section contact di homepage.
- Pastikan pesan masuk ke `/admin/messages`.
- Pastikan Resend mengirim email ke `OWNER_EMAIL`.

## 5. Sebelum deploy Vercel

Tambahkan environment variables yang sama di Vercel Project Settings. Untuk production, ubah:

```env
NEXTAUTH_URL="https://domain-kamu.com"
```
