### 3.6 Server Actions: Perintah Langsung ke "Dapur" (Server)

Bayangkan aplikasi web kita seperti sebuah restoran. Halaman yang dilihat pengguna (komponen klien) adalah "ruang makan", sementara server adalah "dapur" tempat semua data diproses dan disimpan.

- **Apa itu Server Actions?**
  Server Actions adalah cara modern di Next.js untuk mengirim perintah dari "ruang makan" langsung ke "dapur" tanpa perlu pelayan khusus (API endpoint). Ini membuat komunikasi antara tampilan depan dan logika belakang menjadi lebih sederhana dan efisien.

- **Analogi**: Jika seorang pelanggan (pengguna) di ruang makan ingin memesan makanan (misalnya, mendaftarkan akun baru), mereka tidak perlu menulis pesanan di kertas dan memberikannya ke pelayan. Mereka cukup menekan tombol "Daftar", dan pesanan itu secara ajaib langsung sampai ke dapur untuk diproses.

#### Di Mana Menemukan Server Actions?

Dalam proyek ini, Server Actions diorganisir di dua tempat utama:

1.  **Direktori `actions/` - Perintah Umum**

    - **Fungsi**: Folder ini berisi kumpulan perintah-perintah yang bersifat umum dan bisa digunakan di banyak bagian aplikasi.
    - **Contoh**:
      - `actions/register.ts`: Berisi logika lengkap untuk mendaftarkan pengguna baru, mulai dari memeriksa apakah email sudah ada, mengenkripsi password, menyimpan data ke database, hingga mengirim email verifikasi.
      - `actions/login.ts`: Menangani proses login pengguna.
      - `actions/getCurrentUser.ts`: Perintah sederhana untuk mendapatkan data pengguna yang sedang login saat ini.

2.  **Direktori `_actions/` di Setiap Modul Dashboard - Perintah Khusus**

    - **Fungsi**: Untuk menjaga kerapian, setiap modul di dalam dashboard (seperti `obat`, `pasien`, `antrian`) memiliki folder `_actions/` sendiri. Folder ini berisi perintah-perintah yang hanya relevan untuk modul tersebut.
    - **Contoh**:
      - `app/(protected)/dashboard/obat/_actions/createObat.tsx`: Berisi fungsi untuk menambahkan data obat baru ke database.
      - `app/(protected)/dashboard/antrian/_actions/deletePasien.tsx`: Berisi fungsi untuk menghapus seorang pasien dari daftar antrian.
      - `app/(protected)/dashboard/pemeriksaan/_actions/createPemeriksaan.tsx`: Perintah yang lebih kompleks untuk menyimpan hasil pemeriksaan, yang juga melibatkan pengurangan stok obat di database.

#### Bagaimana Cara Menggunakannya?

Di dalam kode, sebuah file Server Action ditandai dengan tulisan `"use server";` di bagian paling atas. Ini adalah penanda bagi Next.js bahwa fungsi-fungsi di dalam file ini adalah "perintah ke dapur" yang bisa dipanggil dari mana saja.

```typescript
// Contoh dari file actions/logout.ts
"use server"; // Penanda ini wajib ada!
import { signOut } from "@/auth";

export async function logout() {
  await signOut({ redirect: false });
}
```

Dengan adanya Server Actions, kode menjadi lebih terorganisir dan alur data antara tampilan depan (frontend) dan logika belakang (backend) menjadi lebih mulus.
