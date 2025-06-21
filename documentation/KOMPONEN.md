### 3.5 Komponen UI: Balok "Lego" untuk Membangun Tampilan

Bayangkan Anda sedang membangun sesuatu dengan balok Lego. Daripada membuat setiap balok dari nol, akan lebih mudah jika Anda sudah punya koleksi balok siap pakai dengan berbagai bentuk dan ukuran. Di proyek ini, direktori `components/` adalah kotak "Lego" kita.

#### `components/ui/` - Koleksi Lego dari Shadcn/ui

- **Fungsi**: Folder ini berisi komponen-komponen antarmuka (UI) dasar yang kita dapatkan dari **shadcn/ui**. Ini adalah komponen yang sangat umum dan sering digunakan di banyak halaman.
- **Contoh Komponen**:
  - `Button.tsx`: Tombol yang bisa diklik.
  - `Card.tsx`: Wadah atau kartu untuk menampilkan informasi.
  - `Input.tsx`: Kotak untuk pengguna memasukkan teks.
  - `Dialog.tsx`: Jendela pop-up untuk menampilkan pesan atau konfirmasi.
  - `Table.tsx`: Komponen untuk membuat tabel data yang rapi.
- **Keuntungan**: Menggunakan `shadcn/ui` membuat tampilan aplikasi kita terlihat profesional dan konsisten tanpa perlu membuatnya dari awal.

#### Komponen Kustom: Lego yang Kita Rakit Sendiri

Selain komponen dasar dari `shadcn/ui`, kita juga membuat komponen yang lebih besar dan spesifik untuk kebutuhan aplikasi.

- **`components/Navbar.tsx`**

  - **Fungsi**: Ini adalah komponen untuk bilah navigasi (menu) yang ada di bagian atas halaman publik.
  - **Kecanggihan**: Komponen ini responsif. Artinya, ia akan menampilkan menu yang berbeda di layar besar (Desktop) dan layar kecil (Mobile). Ia juga bisa mendeteksi saat pengguna menggulir halaman ke bawah dan akan menampilkan bayangan (shadow) untuk efek visual yang bagus.
  - **Komponen Pendukung**:
    - `DesktopNavbar.tsx`: Tampilan menu untuk layar besar.
    - `MobileNavbar.tsx`: Tampilan menu untuk layar kecil/ponsel.

- **`app/(protected)/dashboard/_components/DataTable.tsx`**
  - **Fungsi**: Ini adalah salah satu komponen kustom paling kuat di proyek ini. `DataTable` adalah sebuah tabel serbaguna yang digunakan di hampir semua halaman dashboard untuk menampilkan daftar data (pasien, obat, antrian, dll).
  - **Fitur-fitur**:
    1.  **Menampilkan Data**: Menerima data dan definisi kolom untuk ditampilkan.
    2.  **Pencarian**: Memiliki kotak pencarian untuk memfilter data berdasarkan kata kunci.
    3.  **Penyortiran**: Pengguna bisa mengklik header kolom untuk mengurutkan data (misalnya, dari A-Z atau dari kecil ke besar).
    4.  **Filter Waktu**: Memiliki dropdown untuk memfilter data berdasarkan rentang waktu (Harian, Mingguan, Bulanan, Tahunan).
    5.  **Ekspor ke Excel**: Terdapat tombol untuk mengunduh data yang sedang ditampilkan dalam format file Excel (.xlsx).
    6.  **Paginasi**: Membagi data menjadi beberapa halaman jika datanya sangat banyak, lengkap dengan tombol "Next" dan "Previous".

Dengan menggunakan komponen-komponen ini, kita bisa membangun halaman dengan cepat dan menjaga tampilan tetap konsisten di seluruh bagian aplikasi.
