### 3.1 Konfigurasi Proyek: Mengatur Cara Kerja Aplikasi

Setiap aplikasi membutuhkan file-file pengaturan untuk memberitahu berbagai teknologi cara bekerja. Anggap saja ini seperti buku panduan atau resep untuk setiap perkakas yang kita gunakan.

#### `package.json` - Kartu Identitas Proyek

- **Fungsi**: Ini adalah file paling penting yang berisi informasi dasar tentang proyek, daftar "perkakas" (dependensi) yang dibutuhkan, dan "perintah" (skrip) untuk menjalankan aplikasi.

- **Isi Penting**:

  - `"name"`: Nama proyek kita, yaitu `"website-dokter"`.
  - `"scripts"`: Perintah-perintah singkat untuk developer.
    - `"dev"`: Menjalankan aplikasi di komputer lokal untuk proses pengembangan.
    - `"build"`: "Mengemas" semua kode menjadi versi siap pakai untuk diunggah ke server (produksi).
    - `"start"`: Menjalankan aplikasi yang sudah di-"kemas" tadi di server produksi.
  - `"dependencies"`: Daftar semua perkakas utama yang dibutuhkan aplikasi agar bisa berjalan, seperti `next`, `react`, dan `prisma`.
  - `"devDependencies"`: Daftar perkakas yang hanya dibutuhkan oleh developer saat menulis kode, seperti `typescript` dan `eslint`.

  <!-- end list -->

  ```json
  {
    "name": "website-dokter",
    "scripts": {
      "dev": "next dev --turbopack",
      "build": "...",
      "start": "next start"
    },
    "dependencies": {
      "next": "15.1.3",
      "react": "^18.0.0",
      "@prisma/client": "^6.2.1",
      "next-auth": "^5.0.0-beta.25"
    }
  }
  ```

#### `next.config.ts` - Pengaturan Khusus Next.js

- **Fungsi**: File untuk memberikan instruksi khusus kepada Next.js, "sang arsitek" proyek kita.
- **Isi Penting**:
  - `serverExternalPackages: ["bcrypt"]`: Memberi tahu Next.js bahwa paket `bcrypt` (untuk enkripsi password) adalah paket khusus yang perlu penanganan berbeda di server.
  - `eslint: { ignoreDuringBuilds: true }`: Instruksi untuk mengabaikan pemeriksaan kualitas kode (ESLint) saat proses `build`. Ini dilakukan agar proses build ke server produksi lebih cepat.

#### `tailwind.config.ts` - Buku Panduan Dekorasi

- **Fungsi**: Mengatur semua hal yang berkaitan dengan tampilan dan gaya (styling) menggunakan Tailwind CSS.

- **Isi Penting**:

  - `content`: Memberi tahu Tailwind file mana saja yang perlu dipindai untuk menemukan class CSS yang kita gunakan.
  - `theme.extend.colors`: Di sinilah kita mendefinisikan warna-warna kustom. Contohnya, kita memberi nama warna untuk tema (`primary`, `destructive`) dan warna khusus untuk kalender (`calendar-closed`, `calendar-today`).
  - `plugins`: Menambahkan fungsionalitas ekstra, seperti `tailwindcss-animate` untuk membuat animasi sederhana.

  <!-- end list -->

  ```typescript
  // Contoh di dalam tailwind.config.ts
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        // ... warna tema lainnya
        "calendar-closed": "#d4fabe",
        "calendar-today": "#fefcd9",
      },
    },
  },
  ```

#### `tsconfig.json` - Kamus & Aturan TypeScript

- **Fungsi**: Mengatur bagaimana TypeScript, si "pemeriksa kualitas kode", harus bekerja.
- **Isi Penting**:
  - `compilerOptions.paths`: Ini adalah fitur yang sangat membantu. Kita mendefinisikan "jalan pintas" untuk impor file. Misalnya, `@/*` berarti "mulai dari folder root". Jadi, daripada menulis `import Button from "../../../components/ui/button"`, kita cukup menulis `import { Button } from "@/components/ui/button"`.

#### `postcss.config.mjs` - Konfigurasi Tambahan untuk CSS

- **Fungsi**: File konfigurasi untuk PostCSS, sebuah alat yang bekerja di belakang layar untuk membantu Tailwind CSS memproses semua kode CSS kita. Bagi pemula, cukup tahu bahwa file ini ada untuk memastikan Tailwind berjalan dengan benar.

#### `components.json` - Pengaturan untuk Komponen UI

- **Fungsi**: Ini adalah file konfigurasi khusus untuk `shadcn/ui`. File ini memberi tahu `shadcn/ui` bagaimana proyek kita diatur.
- **Isi Penting**:
  - `"aliases"`: Mendefinisikan jalan pintas yang sama seperti di `tsconfig.json` agar saat kita menambahkan komponen baru menggunakan perintah `shadcn-ui`, komponen tersebut akan diletakkan di folder yang benar.

#### `.gitignore` - Daftar File yang Diabaikan

- **Fungsi**: Ini adalah daftar file atau folder yang tidak akan disimpan ke dalam riwayat versi Git (misalnya di GitHub).
- **Kenapa Penting?**:
  - **Keamanan**: Mencegah file sensitif seperti `.env` (yang berisi password database atau kunci rahasia) terunggah ke publik.
  - **Efisiensi**: Menghindari penyimpanan folder `node_modules` yang ukurannya sangat besar dan bisa di-install ulang kapan saja.
  - **Kebersihan**: Menjaga repositori tetap bersih dari file-file hasil build atau log yang tidak relevan.
