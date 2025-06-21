### 4.1 Bug Navigasi Di Mobile

Ketika membuka website di aplikasi, navigasi akan berubah menjadi dropdown dengan tombol hamburger di pojok kanan atas. Ketika diklik akan muncul daftar halaman yang bisa dikunjungi. Akan tetapi ketika kita berpindah halaman, Navigasinya tetap muncul, tidak hilang
![image](/documentation/images/bug_navigasi_1.png)

#### Solusi

1. Silahkan buka file `components/MobileNavbarAction.tsx`
2. Disitu akan terlihat kode seperti berikut (contoh)
   ```html
   <Link
        href="/daftar-janji"
        className={buttonVariants({ variant: "outline" })}
    >
        Janji Saya
    </Link>
   ```
   Kode tersebut menunjukkan navigasi bagian Janji Saya
3. Ubah kode tersebut dari `<Link>` Menjadi Button, kemudian hapus class name dan href. serta tambahkan fungsi onClick sehingga menjadi
   ```html
   <Button
       onClick={() => window.location.replace('/daftar-janji')}
   >
       Janji Saya
   </Button >
   ```
4. Lakukan hal yang sama ke navigasi yang lain, Navigasi ditandai dengan `<Link ...` atau yang mirip seperti kode poin nomor 2.
