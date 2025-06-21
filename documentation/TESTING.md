### 3.8 Testing (k6): Menguji Kekuatan dan Ketersediaan Aplikasi

Bayangkan klinik digital kita akan dibuka untuk umum. Sebelum itu, kita perlu memastikan bahwa "bangunan" kita kokoh dan dapat melayani banyak pengunjung sekaligus tanpa roboh. Di sinilah peran **k6**, sebuah alat untuk melakukan pengujian performa.

- **Apa itu k6?**
  k6 adalah alat yang bertindak seperti "simulator pengunjung". Ia bisa menciptakan ratusan atau ribuan pengguna virtual yang akan mengakses website kita secara bersamaan untuk melihat seberapa kuat aplikasi kita menahan beban.

- **Di mana file pengujiannya?**
  Semua skrip untuk pengujian ini disimpan di dalam folder `test/`.

#### Jenis Pengujian yang Dilakukan

Ada dua skrip pengujian utama dalam proyek ini:

1.  **`load-test.js` - Uji Beban (Stress Test)**

    - **Fungsi**: Skrip ini bertujuan untuk menjawab pertanyaan: "Seberapa kuat aplikasi kita jika diserbu banyak pengguna?"
    - **Cara Kerja**:
      - **Simulasi Lonjakan**: Skrip ini akan mensimulasikan jumlah pengguna yang datang secara bertahap (misalnya, dari 0 hingga 10 pengguna dalam 30 detik).
      - **Beban Konstan**: Kemudian, ia akan mempertahankan jumlah pengguna tersebut selama beberapa waktu (misalnya, 10 pengguna selama 1 menit) untuk melihat apakah performa aplikasi tetap stabil.
      - **Penurunan**: Terakhir, jumlah pengguna akan dikurangi kembali ke nol.
    - **Apa yang Diukur?**:
      - `http_req_duration`: Berapa lama waktu yang dibutuhkan aplikasi untuk merespons setiap permintaan.
      - `http_req_failed`: Berapa banyak permintaan yang gagal. Tujuannya adalah agar tingkat kegagalan ini serendah mungkin.

2.  **`avalibility-test.js` - Uji Ketersediaan (Apakah Pintu Terkunci dengan Benar?)**
    - **Fungsi**: Skrip ini bertujuan untuk memastikan sistem keamanan kita bekerja dengan baik. Ia memeriksa apakah "pintu publik" benar-benar terbuka untuk semua orang dan "pintu staf" benar-benar terkunci untuk yang tidak berhak.
    - **Cara Kerja**:
      - **Cek Halaman Publik**: k6 akan mencoba mengakses halaman seperti `/login` atau `/register` dan memastikan halaman tersebut berhasil dibuka (status 200 OK).
      - **Cek Halaman Terproteksi**: k6 juga akan mencoba mengakses halaman `/dashboard` **tanpa login**. Harapannya adalah akses ini akan gagal (status bukan 200 OK), yang membuktikan bahwa sistem keamanan kita berfungsi.

#### Hasil Pengujian

- **`summary.html` & `summary.json`**: Setelah pengujian selesai, k6 akan menghasilkan dua file laporan.
  - `summary.html`: Laporan visual dalam format HTML yang mudah dibaca, lengkap dengan grafik dan tabel.
  - `summary.json`: Data mentah hasil pengujian dalam format JSON untuk analisis yang lebih mendalam jika diperlukan.

Dengan melakukan pengujian ini, kita bisa lebih percaya diri bahwa aplikasi klinik digital kita siap digunakan oleh banyak orang tanpa mengalami masalah performa atau keamanan.
