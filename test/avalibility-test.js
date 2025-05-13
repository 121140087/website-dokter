import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.2/index.js";

export let options = {
  vus: 5,
  duration: "2m",
};

let successCount = new Counter("successful_requests");
let failureCount = new Counter("failed_requests");

const BASE_URL = "http://praktik-dr-hema.my.id/";

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

const publicRoutes = ["/", "/login", "/register", "/buat-janji"];

export default function () {
  // Test protected routes
  for (const route of protectedRoutes) {
    const res = http.get(`${BASE_URL}${route}`, { redirects: 0 });

    const ok = check(res, {
      [`GET ${route} status is not 200`]: (r) => r.status !== 200,
    });

    if (ok) {
      successCount.add(1);
    } else {
      failureCount.add(1);
      console.log(
        `[FAIL] Protected route accessible without authentication: ${route}, Status: ${res.status}`
      );
    }

    sleep(1);
  }

  // Test public routes
  for (const route of publicRoutes) {
    const res = http.get(`${BASE_URL}${route}`);

    const ok = check(res, {
      [`GET ${route} status is 200`]: (r) => r.status === 200,
    });

    if (ok) {
      successCount.add(1);
    } else {
      failureCount.add(1);
      console.log(
        `[FAIL] Public route unavailable: ${route}, Status: ${res.status}`
      );
    }

    sleep(1);
  }
}

export function handleSummary(data) {
  // Logging untuk menampilkan data metrics secara lebih rinci
  console.log("Summary Data:", JSON.stringify(data.metrics, null, 2));

  // Mengambil count dari metrik dengan pengecekan lebih lanjut
  const successfulRequestsCount = data.metrics["successful_requests"]
    ? data.metrics["successful_requests"].values.count
    : 0;

  const failedRequestsCount = data.metrics["http_req_failed"]
    ? data.metrics["http_req_failed"].values.fails
    : 0;

  // Perhitungan total dan availability
  const total = successfulRequestsCount + failedRequestsCount;
  const availability = total > 0 ? (successfulRequestsCount / total) * 100 : 0;

  const customSummary = `
========== RINGKASAN PENGUJIAN AVAILABILITY ==========
Total Permintaan      : ${total}
Berhasil              : ${successfulRequestsCount}
Gagal                 : ${failedRequestsCount}
Ketersediaan Sistem   : ${availability.toFixed(2)}%
======================================================
`;

  return {
    stdout:
      textSummary(data, { indent: " ", enableColors: true }) +
      "\n" +
      customSummary,
  };
}
