# Landing

> landing page adalah halaman yang ditampilkan pertama kali ketika membuka website https://website-dokter-murex.vercel.app/ . Halaman ini berisikan informasi klinik dan dapat diakses tanpa perlu loading

## Penjelasan

### Struktur Folder

- Silahkan buka folder yang bernama **(landing)**
- Di dalam folder memiliki struktur seperti berikut

```c
(landing)/
| -- _components/
| -- (auth)/
| -- (protected)/
| -- layout.tsx
| -- page.tsx
```

- File **layout.tsx** memungkinkan kita untuk mempertahankan elemen tertentu di seluruh halaman, seperti header, sidebar, atau footer.
- file **page.tsx** berfungsi sebagai halaman utama dalam suatu rute. Setiap folder dalam app/ yang memiliki page.tsx akan otomatis menjadi route (URL path) yang bisa diakses oleh pengguna
- folder **\_components** berfungsi untuk menyimpan component yang nantinya kita akan buat. penamaan folder dengan diawali underscore ( _ ) dimaksudkan supaya folder tidak dianggap sebagai route baru. Jika kita tidak memberikan underscore maka folder tersebut dianggap sebagai route dan dapat diakses dengan _/components\_
- folder **(auth)** berisi route untuk autentikasi seperti login dan register. penamaan folder dengan tanda kurung buka () hanya berfungsi untuk pengelompokan dan tidak dianggap sebagai route baru oleh nextjs
- folder **(protected)** berisi kumpulan route yang dilindungi. Berarti jika ingin mengakses route tersebut, pengguna diharuskan login terlebih dahulu. Akan tetapi setiap route tetap di daftarkan dalam route yang diprotecsi di file **auth.config.ts**

## Kode

**layout.tsx**

```typescript
const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default LandingLayout;
```

- `<Navbar />` merupakan komponen Navigasi yang berida di dalam file **/components/Navbar.tsx**
- `{children}` merupakan komponen yang berada pada file page.tsx. `{children}` ini hanya bisa dipanggil di file layout.tsx dan berisikan semua komponen yang ada di page.tsx.
- `<Navbar />` kita tambahkan di dalam layout.tsx karena kita ingin supaya `<Navbar />` selalu ada di semua route yang ada di folder **(landing)** tanpa harus menulisnya terus menerus. Anda bisa melihat di route _/login,/register,/antrian,..._ dan perhatikan bahwa di semua halaman tersebut terdapat navbar dibagian atasnya walaupun kalau kita buka file page.tsx setiap route tersebut kita tidak memanggil komponen `<Navbar />`

![image](/documentation/images/navbar.png)

- Untuk page.tsx bisa hanya berisikan komponen dan kode html
