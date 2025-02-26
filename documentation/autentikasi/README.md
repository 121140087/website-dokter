# Autentikasi

> Autentikasi adalah proses verifikasi identitas pengguna untuk memastikan bahwa mereka memiliki izin akses ke suatu sistem atau layanan. Di dalam project ini, autentikasi menggunakan library yang bernama authjs ( https://authjs.dev ). Autentikasi yang digunakan hanya terbatas email dan password, Jika menginginkan Oauth anda bisa menambahkannya sendiri dengan melihat dokumentasi authjs

## Instalasi AuthJS

> Anda tidak perlu melakukannya lagi, pembuat hanya ingin menunjukan cara instalasi authJS

1. Menambahkan library authjs

```bash
npm install next-auth@beta
```

2. Setup Environment
   kode dibawah ini akan menambahkan variabel AUTH_SECRET di dalam .env

```bash
npx auth secret
```

3. Konfigurasi
