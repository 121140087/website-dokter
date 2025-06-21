### 3.3 Autentikasi (Auth.js): Sang Petugas Keamanan Aplikasi

Bayangkan autentikasi seperti sistem keamanan di sebuah gedung. Tujuannya adalah untuk memastikan hanya orang yang tepat yang bisa masuk ke ruangan yang tepat. Di proyek ini, kita menggunakan **Auth.js** (sebelumnya dikenal sebagai NextAuth.js) sebagai petugas keamanannya.

#### Bagaimana Cara Kerjanya?

Sistem keamanan ini mengatur beberapa hal penting:

1.  **Login & Registrasi**: Memeriksa "kartu identitas" (email dan password) saat pengguna mencoba masuk atau mendaftar.
2.  **Manajemen Sesi**: Setelah pengguna berhasil login, Auth.js akan memberinya "kartu akses" (sesi) sehingga pengguna tidak perlu login berulang kali setiap membuka halaman baru.
3.  **Proteksi Halaman**: Menjaga agar halaman-halaman penting tidak bisa diakses oleh sembarang orang.

#### File-File Kunci untuk Keamanan

Ada beberapa file utama yang menjadi pusat kendali sistem keamanan ini:

- **`auth.ts` - Pusat Konfigurasi Keamanan**

  - **Fungsi**: Ini adalah markas besar dari Auth.js. Di sinilah kita mengatur bagaimana cara login bekerja.
  - **Isi Penting**:
    - `PrismaAdapter`: Memberi tahu Auth.js untuk menyimpan semua data terkait pengguna (seperti akun, sesi, token) ke dalam database Prisma kita.
    - `Credentials Provider`: Mengatur agar pengguna bisa login menggunakan email dan password.
    - `authorize`: Bagian logika terpenting di sini. Saat seseorang mencoba login, fungsi ini akan:
      1.  Mencari pengguna di database berdasarkan email yang dimasukkan.
      2.  Jika ditemukan, ia akan membandingkan password yang dimasukkan dengan password yang tersimpan di database (yang sudah dienkripsi) menggunakan `bcrypt`.
      3.  Hanya jika keduanya cocok, pengguna diizinkan masuk.

- **`middleware.ts` - Penjaga di Setiap Pintu (Route)**

  - **Fungsi**: Ini adalah petugas keamanan yang berjaga di setiap "pintu" atau halaman aplikasi. Setiap kali ada yang mencoba mengakses sebuah halaman, middleware ini akan memeriksa terlebih dahulu.
  - **Bagaimana cara kerjanya?**: Middleware ini menggunakan aturan yang kita definisikan di `auth.config.ts`.

- **`auth.config.ts` - Buku Aturan Keamanan**
  - **Fungsi**: Berisi semua aturan yang akan dijalankan oleh `middleware.ts`.
  - **Aturan Penting**:
    - `pages: { signIn: "/login" }`: Jika ada orang yang mencoba masuk ke halaman terproteksi tanpa login, mereka akan langsung diarahkan ke halaman `/login`.
    - `callbacks.authorized`: Ini adalah aturan utamanya. Di sini kita mendefinisikan:
      - Halaman mana saja yang dilindungi (misalnya, semua yang ada di `/dashboard`).
      - Siapa saja yang boleh masuk ke halaman tersebut. Contoh: halaman `/dashboard` hanya boleh diakses oleh pengguna yang sudah login DAN memiliki peran `DOKTER` atau `RESEPSIONIS`. Pasien tidak akan bisa masuk.
    - `callbacks.session` dan `callbacks.jwt`: Fungsi ini digunakan untuk menambahkan informasi tambahan ke "kartu akses" pengguna, seperti peran (`role`) dan NIK (`nik`), sehingga kita bisa menggunakannya di berbagai halaman.

#### Alur Verifikasi Email yang Aman

Untuk memastikan email yang didaftarkan valid, proyek ini menerapkan alur verifikasi:

1.  **Pendaftaran**: Saat pengguna baru mendaftar, akunnya dibuat tetapi statusnya "belum diverifikasi".
2.  **Pengiriman Token**: Sistem membuat sebuah kode rahasia (token) dan mengirimkannya ke email pengguna dalam bentuk link.
3.  **Konfirmasi**: Pengguna harus membuka email dan mengklik link tersebut untuk membuktikan bahwa ia adalah pemilik email yang sah.
4.  **Aktivasi Akun**: Setelah link diklik, sistem akan memvalidasi token dan mengubah status akun menjadi "terverifikasi".
5.  **Bisa Login**: Baru setelah itu, pengguna dapat login ke dalam aplikasi.
