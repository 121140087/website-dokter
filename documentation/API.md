### 3.7 API Routes: Pintu Khusus untuk Komunikasi

Jika Server Actions adalah "perintah langsung ke dapur", maka API Routes adalah seperti **"pintu layanan khusus"** atau **"jendela drive-thru"** di restoran kita. Pintu ini punya tujuan spesifik dan biasanya digunakan untuk berkomunikasi dengan sistem di luar aplikasi kita atau untuk tugas-tugas yang tidak bisa ditangani oleh Server Actions.

Dalam proyek ini, semua API Routes berada di dalam folder `app/api/`.

#### `app/api/chat/route.ts` - Jalur Komunikasi dengan Asisten AI

- **Fungsi**: Endpoint ini adalah jembatan antara aplikasi kita dengan "otak" dari Asisten AI, yaitu Google Gemini.

- **Alur Kerja**:

  1.  Pengguna mengetik pesan di komponen Chatbot pada tampilan web.
  2.  Komponen tersebut mengirim pesan ke `.../api/chat`.
  3.  File `route.ts` ini menerima pesan tersebut, lalu meneruskannya ke layanan Google Gemini.
  4.  Google Gemini memproses pesan dan mengirimkan balasan.
  5.  Endpoint ini menerima balasan dan langsung **mengalirkannya (streaming)** kembali ke komponen Chatbot, sehingga balasan dari AI muncul kata per kata, bukan menunggu seluruh kalimat selesai.

  <!-- end list -->

  ```typescript
  // app/api/chat/route.ts
  import { google } from "@ai-sdk/google";
  import { streamText } from "ai";

  export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
      model: google("gemini-2.0-flash"), // Menggunakan model AI dari Google
      system: "kamu adalah seorang asisten AI...", // Instruksi untuk AI
      messages,
    });

    return result.toDataStreamResponse(); // Mengembalikan respons dalam bentuk streaming
  }
  ```

#### `app/api/payment/` - Gerbang Pembayaran dengan Midtrans

Folder ini berisi semua logika yang berhubungan dengan transaksi pembayaran.

- **`route.ts` - Membuat Sesi Pembayaran**

  - **Fungsi**: Untuk memulai proses pembayaran.
  - **Alur Kerja**:
    1.  Saat pasien menekan tombol "Bayar Sekarang" di halaman pemeriksaan./page.tsx]
    2.  Halaman tersebut akan memanggil endpoint `.../api/payment`.
    3.  Endpoint ini akan berkomunikasi dengan Midtrans, mengirimkan detail transaksi seperti total harga.
    4.  Midtrans akan memberikan sebuah "kunci" atau `token` unik untuk sesi pembayaran tersebut.
    5.  Token ini dikirim kembali ke browser pengguna, yang kemudian akan diarahkan ke halaman pembayaran Midtrans menggunakan token tersebut./page.tsx]

- **`confirmation/route.ts` - Menerima Konfirmasi Pembayaran**

  - **Fungsi**: Sebagai "penerima notifikasi" dari Midtrans setelah pembayaran selesai.
  - **Alur Kerja**:
    1.  Setelah pasien menyelesaikan pembayaran di halaman Midtrans, Midtrans akan mengarahkan kembali ke aplikasi kita, tepatnya ke URL konfirmasi (misalnya, `/pemeriksaan/[id]/confirmation`).
    2.  Halaman konfirmasi ini memanggil endpoint `.../api/payment/confirmation`./confirmation/page.tsx]
    3.  Endpoint ini akan bertanya kepada Midtrans: "Apakah pembayaran untuk pesanan ini benar-benar sudah berhasil?".
    4.  Jika Midtrans mengonfirmasi bahwa statusnya `settlement` (lunas), endpoint ini akan memperbarui status `dibayar` di database kita dari `false` menjadi `true`.

#### `app/api/auth/[...nextauth]/route.ts` - Pintu Wajib untuk NextAuth.js

- **Fungsi**: Ini adalah endpoint internal yang wajib ada agar NextAuth.js bisa bekerja. File ini secara otomatis menangani berbagai alur autentikasi yang kompleks di belakang layar, seperti callback dari provider OAuth (jika digunakan) dan manajemen sesi. Anda tidak perlu mengubah file ini./route.ts]
