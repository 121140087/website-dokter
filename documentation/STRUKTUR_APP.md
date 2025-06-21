### 3.2 Struktur Direktori `app` (Pusat Kendali Aplikasi)

Bayangkan direktori `app/` sebagai denah atau cetak biru dari "klinik digital" kita. Semua ruangan (halaman) dan koridor (navigasi) diatur di dalam folder ini. Next.js secara otomatis mengubah folder dan file di sini menjadi halaman web yang bisa diakses pengguna.

#### Pengelompokan dengan `()` - Folder yang Tidak Menjadi URL

Anda akan melihat folder seperti `(landing)` dan `(protected)`. Tanda kurung `()` ini punya fungsi khusus:

- **Tujuan**: Untuk mengelompokkan halaman-halaman yang sejenis agar kode lebih rapi.
- **Penting**: Nama folder ini **tidak akan muncul di URL**. Jadi, halaman di dalam `app/(landing)/login` akan diakses melalui `.../login`, bukan `.../landing/login`.

#### `app/(landing)/` - Area Publik untuk Pasien dan Pengunjung

Ini adalah "lobi" atau area depan klinik kita. Semua halaman di sini bisa diakses oleh siapa saja.

- **`page.tsx`**: Ini adalah halaman utama atau beranda (Homepage) dari website kita.
- **`layout.tsx`**: "Desain interior" untuk semua halaman di area publik. File ini memastikan komponen seperti `<Navbar />` (menu navigasi atas) selalu muncul di setiap halaman publik.
- **`(auth)/`**: Berisi semua halaman yang berhubungan dengan akun pengguna, seperti:
  - `login/page.tsx`: Halaman untuk masuk.
  - `register/page.tsx`: Halaman untuk mendaftar akun baru.
- **`(protected)/`**: Berisi halaman-halaman yang hanya bisa diakses oleh pasien yang **sudah login**, seperti:
  - `buat-janji/page.tsx`: Halaman untuk membuat janji temu baru.
  - `pemeriksaan/page.tsx`: Halaman untuk melihat riwayat hasil pemeriksaan.

#### `app/(protected)/dashboard/` - Area Internal untuk Staf Klinik

Ini adalah "ruang kerja" atau kantor belakang yang hanya bisa diakses oleh Dokter dan Resepsionis.

- **`layout.tsx`**: "Desain interior" untuk area dashboard. File ini memastikan `<Sidebar />` (menu samping) dan `<DashboardNavbar />` (header dashboard) selalu tampil di semua halaman internal.
- **Struktur Modul (Contoh: `/dashboard/obat/`)**: Setiap fitur manajemen di dashboard (obat, pasien, antrian) memiliki folder sendiri dengan struktur yang rapi:
  - `page.tsx`: Halaman utama modul untuk menampilkan daftar data (misalnya, daftar semua obat).
  - `create/page.tsx`: Halaman untuk menambah data baru (misalnya, form untuk menambah obat baru).
  - `_actions/`: Folder berisi "perintah-perintah" khusus untuk modul itu. Contoh: `createObat.tsx` untuk logika menyimpan obat baru ke database.

#### `app/api/` - Pintu Khusus untuk Komunikasi Eksternal

Folder ini berisi endpoint API, yaitu "pintu" khusus yang bisa diakses oleh layanan lain atau untuk tugas-tugas spesifik.

- `payment/`: Mengurus komunikasi dengan Midtrans untuk proses pembayaran.
- `chat/`: Menangani permintaan dari fitur Chatbot untuk berkomunikasi dengan AI Google.
