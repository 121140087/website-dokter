### 1. Pendahuluan

Proyek ini adalah sebuah **Sistem Informasi Manajemen Klinik** yang dirancang untuk memodernisasi dan mempermudah operasional sehari-hari di klinik dokter. Aplikasi ini dibangun dengan arsitektur modern menggunakan Next.js dan App Router, yang memisahkan fungsionalitas menjadi dua bagian utama:

1.  **Antarmuka Pasien (Sisi Publik)**
    Ini adalah website yang dapat diakses oleh siapa saja. Pasien dapat melihat informasi klinik, jadwal praktik, membuat janji temu secara online, melihat riwayat pemeriksaannya, dan melakukan konsultasi langsung dengan dokter atau asisten AI melalui fitur chat.

    - Halaman utama dapat dilihat di `app/(landing)/page.tsx`.
    - Fitur pembuatan janji ada di `app/(landing)/(protected)/buat-janji/page.tsx`.

2.  **Antarmuka Internal (Dashboard)**
    Ini adalah area khusus untuk staf klinik (Dokter dan Resepsionis) yang memerlukan login. Dashboard ini berfungsi sebagai pusat kendali untuk mengelola seluruh aspek operasional klinik.
    - **Dokter** dapat melihat antrian, melakukan pemeriksaan, menulis resep, dan berkomunikasi dengan pasien.
    - **Resepsionis** dapat mengelola antrian, mendaftarkan pasien baru, dan mengatur jadwal klinik.
    - Layout utama dashboard terdapat di `app/(protected)/dashboard/layout.tsx`.

Tujuan utama dari aplikasi ini adalah untuk meningkatkan efisiensi operasional klinik dan memberikan kemudahan akses layanan kesehatan bagi pasien.

### Teknologi Utama

#### Rangkuman

- **Framework**: Next.js 15 (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Komponen UI**: shadcn/ui
- **ORM**: Prisma
- **Autentikasi**: Auth.js (NextAuth.js v5)
- **Database**: PostgreSQL
- **Real-time & Chat**: Supabase
- **Pembayaran**: Midtrans
- **Pengujian Performa**: k6

#### Rincian

Berikut adalah rincian teknologi yang digunakan dalam proyek ini dan peran masing-masing:

- **Framework: Next.js (App Router)**

  - **Peran**: Sebagai kerangka kerja utama untuk membangun keseluruhan aplikasi. App Router digunakan untuk membuat aplikasi yang cepat dengan pemisahan komponen server dan klien, serta optimasi rendering.

- **Bahasa: TypeScript**

  - **Peran**: Menambahkan sistem tipe statis di atas JavaScript. Ini membantu mendeteksi error lebih awal saat pengembangan, meningkatkan keterbacaan kode, dan mempermudah pemeliharaan jangka panjang.

- **Database & ORM: PostgreSQL & Prisma**

  - **Peran**: **PostgreSQL** adalah sistem database relasional yang digunakan untuk menyimpan semua data aplikasi. **Prisma** bertindak sebagai ORM (Object-Relational Mapper) yang memungkinkan developer berinteraksi dengan database menggunakan kode TypeScript, bukan SQL mentah, sehingga lebih aman dan intuitif.
  - **Referensi**: [Tutorial Prisma](https://www.youtube.com/watch?v=vwQR1ONJTbM)

- **Autentikasi: NextAuth.js (Auth.js)**

  - **Peran**: Mengelola seluruh alur autentikasi, termasuk login, registrasi, logout, dan manajemen sesi. Library ini juga digunakan untuk melindungi halaman-halaman tertentu (proteksi route) berdasarkan status login dan peran pengguna (`Role`).
  - **Referensi**: [Tutorial AuthJS](https://www.youtube.com/watch?v=E2L3OxOfn9k)

- **Styling: Tailwind CSS & shadcn/ui**

  - **Peran**: **Tailwind CSS** adalah framework CSS utility-first yang mempercepat proses styling. Di atasnya, **shadcn/ui** digunakan untuk menyediakan koleksi komponen UI yang sudah jadi, aksesibel, dan mudah dikustomisasi (seperti `Button`, `Card`, `Dialog`), yang dapat ditemukan di direktori `components/ui`.
  - **Referensi**: [Tutorial Shadcn UI](https://www.youtube.com/watch?v=KqnS9eWOEPc)

- **Fitur Real-time: Supabase**

  - **Peran**: Supabase digunakan secara spesifik untuk fitur _real-time_-nya. Ini memungkinkan aplikasi untuk "mendengarkan" perubahan pada database secara langsung, yang sangat penting untuk membangun fitur obrolan (chat) antara dokter dan pasien.

- **Gateway Pembayaran: Midtrans**

  - **Peran**: Mengelola semua transaksi pembayaran untuk biaya pemeriksaan. Dengan menggunakan Midtrans, logika pembayaran yang rumit dan sensitif ditangani oleh pihak ketiga yang aman dan terpercaya.
  - **Referensi**: [Dokumentasi Payment]()

- **AI Chatbot: Google Gemini**

  - **Peran**: Memberikan layanan asisten virtual yang dapat menjawab pertanyaan-pertanyaan umum seputar kesehatan. Model AI yang digunakan adalah `gemini-2.0-flash` dari Google.

- **Pengujian: k6**
  - **Peran**: Digunakan untuk melakukan _load testing_ dan _availability testing_ guna memastikan bahwa aplikasi dapat menangani sejumlah besar pengguna secara bersamaan dan tetap stabil.
