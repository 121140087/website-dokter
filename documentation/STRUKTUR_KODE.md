### 2. Struktur Folder Utama

Berikut adalah gambaran umum struktur direktori yang paling penting dalam proyek ini.

```
website-dokter/
├── actions/                  # Server Actions global (login, register, dll.)
├── app/                      # Direktori utama Next.js App Router
│   ├── (landing)/            # Grup route untuk halaman publik
│   │   ├── (auth)/           # Halaman login, register, reset password
│   │   ├── (protected)/      # Halaman pasien (buat janji, daftar janji)
│   │   ├── _components/      # Komponen khusus landing page (chatbot, dll.)
│   │   ├── layout.tsx        # Layout untuk halaman publik
│   │   └── page.tsx          # Komponen halaman utama (/)
│   ├── (protected)/          # Grup route untuk dashboard internal
│   │   └── dashboard/        # Halaman dan modul-modul dashboard
│   │       ├── antrian/
│   │       ├── obat/
│   │       ├── pasien/
│   │       ├── pemeriksaan/
│   │       └── ... (dan modul dashboard lainnya)
│   ├── api/                    # API Routes untuk webhook dan fitur spesifik
│   │   ├── auth/
│   │   ├── chat/
│   │   └── payment/
│   ├── globals.css           # Styling global
│   └── layout.tsx            # Root layout aplikasi
├── components/               # Komponen UI yang dapat digunakan kembali
│   └── ui/                   # Komponen hasil generate dari shadcn/ui
├── data/                     # Data statis atau dummy (contoh: antrian, obat)
├── documentation/            # Folder berisi file dokumentasi
├── lib/                      # Utilitas, definisi, dan klien library
├── prisma/                   # Konfigurasi, skema, dan migrasi database
├── public/                   # Aset statis (gambar, PDF)
├── test/                     # Skrip pengujian k6
├── auth.ts                   # Konfigurasi utama NextAuth.js
├── middleware.ts             # Middleware untuk proteksi route
└── package.json              # Dependensi dan skrip proyek
```

Struktur folder proyek ini dirancang untuk mengikuti konvensi Next.js App Router, dengan pemisahan yang jelas antara logika, komponen, dan fitur.

- `actions/`
  - **Fungsi**: Berisi **Server Actions** global. Ini adalah fungsi-fungsi sisi server yang dapat dipanggil langsung dari komponen klien untuk melakukan operasi backend seperti login, registrasi, dan interaksi data lainnya yang bersifat umum.
- `app/`

  - **Fungsi**: Direktori inti dari aplikasi yang menggunakan Next.js App Router. Setiap folder di dalamnya dapat merepresentasikan sebuah route (halaman).
  - `app/(landing)/`: **Route Group** untuk halaman publik yang dapat diakses oleh semua pengguna. Folder ini tidak memengaruhi URL.
    - `(auth)/`: Sub-grup untuk halaman-halaman autentikasi (`/login`, `/register`, `/forgot-password`).
    - `(protected)/`: Sub-grup untuk halaman yang memerlukan **login sebagai pasien**, seperti `/buat-janji` dan `/pemeriksaan`.
    - `_components/`: Komponen yang spesifik hanya untuk halaman landing. Tanda `_` mencegah folder ini menjadi route publik. Contohnya adalah komponen `ChatBox`.
  - `app/(protected)/`: **Route Group** untuk halaman-halaman yang memerlukan hak akses internal (Dokter atau Resepsionis).
    - `dashboard/`: Basis untuk semua halaman dan modul internal. Setiap subfolder di sini (misalnya, `antrian`, `obat`, `pasien`) adalah modul manajemen tersendiri.
  - `app/api/`: Berisi **API Routes** tradisional. Digunakan untuk endpoint yang dipanggil oleh layanan eksternal (seperti webhook dari Midtrans) atau untuk tugas spesifik seperti streaming data (chat AI).
  - `app/layout.tsx`: **Root Layout** yang membungkus seluruh aplikasi.

- `components/`

  - **Fungsi**: Tempat untuk semua komponen React yang dapat digunakan kembali di berbagai halaman.
  - `ui/`: Sub-folder khusus untuk komponen yang di-generate oleh **shadcn/ui**, seperti `Button`, `Card`, dan `Table`.

- `lib/`

  - **Fungsi**: Berisi kode-kode utilitas dan logika pendukung.
  - `utils.ts`: Fungsi-fungsi helper umum, seperti `cn` untuk menggabungkan class Tailwind atau `validEmail` untuk validasi.
  - `definitions/`: Berisi definisi tipe dan skema validasi data menggunakan Zod, seperti `pemeriksaanFormSchema`.
  - `supabaseClient.ts`: Inisialisasi klien Supabase untuk koneksi ke layanan real-time.

- `prisma/`

  - **Fungsi**: Semua yang berhubungan dengan database dan Prisma ORM.
  - `migrations/`: Direktori yang secara otomatis dibuat oleh Prisma untuk menyimpan riwayat perubahan skema database.
  - `seed.ts`: Skrip untuk mengisi data awal (seeding) ke dalam database saat pertama kali di-setup.

- `public/`

  - **Fungsi**: Untuk menyimpan aset statis seperti gambar, ikon, atau font yang akan diakses langsung dari URL root.

- `test/`

  - **Fungsi**: Berisi skrip untuk pengujian performa dan ketersediaan aplikasi menggunakan k6.

- **File Konfigurasi Root**:
  - `auth.ts` & `auth.config.ts`: Konfigurasi inti untuk NextAuth.js.
  - `middleware.ts`: Menerapkan logika autentikasi ke semua permintaan yang masuk ke aplikasi.
