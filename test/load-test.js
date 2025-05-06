import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "1m", target: 10 },
    { duration: "30s", target: 0 },
  ],
};

const BASE_URL = "http://localhost:3000";

export default function () {
  const protectedRoutes = [
    "/dashboard",
    "/dashboard/antrian/create",
    "/dashboard/antrian/1",
    "/dashboard/pasien",
    "/dashboard/pasien/create",
    "/dashboard/pasien/123123123123",
    "/dashboard/obat",
    "/dashboard/obat/create",
    "/dashboard/obat/abc",
    "/dashboard/jadwal",
    "/dashboard/jam-buka",
    "/dashboard/pemeriksaan",
    "/dashboard/pemeriksaan/abc",
    "/dashboard/pemeriksaan/create/abc",
    "/daftar-janji",
    "/daftar-janji/1",
    "/pemeriksaan",
    "/pemeriksaan/1/confirmation",
    "/pemeriksaan/1",
  ];
  for (const route of protectedRoutes) {
    const res = http.get(`${BASE_URL}${route}`, { redirects: 0 });

    check(res, {
      [`GET ${route} status != 200`]: (r) => r.status !== 200,
    });
    sleep(1);
  }

  ["/register", "/login", "/buat-janji", "/"].forEach((route) => {
    const res = http.get(`${BASE_URL}${route}`);
    check(res, {
      [`GET ${route} status 200`]: (r) => r.status === 200,
    });
    sleep(1);
  });
}
