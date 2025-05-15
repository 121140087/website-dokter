import http from "k6/http";
import { check, sleep, group } from "k6";
import { Counter, Trend, Rate } from "k6/metrics"; // Import metrics
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  stages: [
    { duration: "30s", target: 10 }, // Ramp-up: Pengguna bertambah dari 0 ke 10 dalam 30 detik
    { duration: "1m", target: 10 }, // Beban konstan: 10 pengguna selama 1 menit
    { duration: "30s", target: 0 }, // Ramp-down: Berkurang dari 10 ke 0 dalam 30 detik
  ],
  // Enable thresholds for better visualization in reports
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% request harus selesai dalam 500ms
    http_req_failed: ["rate<0.1"], // Error rate harus kurang dari 10%
    successful_requests: ["count>0"],
    http_200_responses: ["count>0"], // Track HTTP 200 responses
  },
  noConnectionReuse: true, // Prevent connection pooling
  insecureSkipTLSVerify: true, // Skip TLS verification if needed
  summaryTrendStats: ["avg", "min", "med", "max", "p(90)", "p(95)", "p(99)"], // For better graph visualization
};

const BASE_URL = "http://praktik-dr-hema.my.id/";

// Define custom metrics
let successfulRequests = new Counter("successful_requests");
let failedRequests = new Counter("failed_requests");
let responseTimes = new Trend("response_times");
let http200Responses = new Counter("http_200_responses"); // Track HTTP 200 responses
let statusCodeTrend = new Trend("status_codes"); // Track status codes for visualization

// Fungsi delay untuk mencegah throttling
function customSleep() {
  sleep(Math.random() * 1 + 2); // Sleep antara 2-3 detik
}

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

  // Test protected routes
  group("Protected Routes", function () {
    // Pilih hanya 5 route secara acak untuk mengurangi jumlah request
    const sampleRoutes = protectedRoutes.slice(0, 5);

    for (const route of sampleRoutes) {
      // Tambahkan timeout yang lebih lama
      const res = http.get(`${BASE_URL}${route}`, {
        redirects: 0,
        timeout: "10s", // Timeout lebih lama
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      // Record status code for visualization
      statusCodeTrend.add(res.status);

      // Check if response is 200
      const is200 = check(res, {
        [`GET ${route} returned 200`]: (r) => r.status === 200,
      });

      if (is200) {
        http200Responses.add(1);
      }

      // Also check if the request completed
      const success = check(res, {
        [`GET ${route} completed (Status: ${res.status})`]: (r) =>
          r.status !== 0,
      });

      if (success) {
        successfulRequests.add(1);
      } else {
        failedRequests.add(1);
      }

      // Record response time
      responseTimes.add(res.timings.duration);

      // Sleep lebih lama untuk menghindari throttling
      customSleep();
    }
  });

  // Test public routes
  group("Public Routes", function () {
    const publicRoutes = ["/register", "/login", "/buat-janji", "/"];

    for (const route of publicRoutes) {
      const res = http.get(`${BASE_URL}${route}`, {
        timeout: "10s", // Timeout lebih lama
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      // Record status code for visualization
      statusCodeTrend.add(res.status);

      // Check if response is 200
      const is200 = check(res, {
        [`GET ${route} returned 200`]: (r) => r.status === 200,
      });

      if (is200) {
        http200Responses.add(1);
      }

      // Also check if the request completed
      const success = check(res, {
        [`GET ${route} completed (Status: ${res.status})`]: (r) =>
          r.status !== 0,
      });

      if (success) {
        successfulRequests.add(1);
      } else {
        failedRequests.add(1);
      }

      // Record response time
      responseTimes.add(res.timings.duration);

      // Sleep lebih lama
      customSleep();
    }
  });
}

export function handleSummary(data) {
  // Ambil total request dari metrics
  const totalRequests = data.metrics.http_reqs
    ? data.metrics.http_reqs.values.count
    : 0;

  // Ambil request yang berhasil dari custom metric
  const successCount = data.metrics.successful_requests
    ? data.metrics.successful_requests.values.count
    : 0;

  // Ambil HTTP 200 responses
  const http200Count = data.metrics.http_200_responses
    ? data.metrics.http_200_responses.values.count
    : 0;

  // Ambil request yang gagal dari custom metric
  const failedCount = data.metrics.failed_requests
    ? data.metrics.failed_requests.values.count
    : 0;

  // Hitung durasi total test
  const totalDuration = data.state ? data.state.testRunDurationMs / 1000 : 0;

  // Hitung availability yang lebih fleksibel
  const availability =
    totalRequests > 0 ? (successCount / totalRequests) * 100 : 0;

  // Hitung persentase HTTP 200
  const http200Percentage =
    totalRequests > 0 ? (http200Count / totalRequests) * 100 : 0;

  // Ambil metrik waktu respons
  const avgResponseTime = data.metrics.response_times
    ? data.metrics.response_times.values.avg
    : 0;
  const minResponseTime = data.metrics.response_times
    ? data.metrics.response_times.values.min
    : 0;
  const maxResponseTime = data.metrics.response_times
    ? data.metrics.response_times.values.max
    : 0;

  // P90 dan P95
  const p90ResponseTime = data.metrics.http_req_duration
    ? data.metrics.http_req_duration.values["p(90)"]
    : data.metrics.response_times
    ? data.metrics.response_times.values.med * 1.5
    : 0;

  const p95ResponseTime = data.metrics.http_req_duration
    ? data.metrics.http_req_duration.values["p(95)"]
    : data.metrics.response_times
    ? data.metrics.response_times.values.med * 2
    : 0;

  // Format ringkasan performa
  const performanceSummary = `
========== PERFORMANCE TEST SUMMARY ==========
Total Requests        : ${totalRequests}
Successful Requests   : ${successCount}
HTTP 200 Responses    : ${http200Count} (${http200Percentage.toFixed(2)}%)
Failed Requests       : ${failedCount}
Error Rate            : ${
    totalRequests > 0 ? ((failedCount / totalRequests) * 100).toFixed(2) : 0
  }%
Average Response Time : ${avgResponseTime.toFixed(2)} ms
Min Response Time     : ${minResponseTime.toFixed(2)} ms
Max Response Time     : ${maxResponseTime.toFixed(2)} ms
90th Percentile       : ${p90ResponseTime.toFixed(2)} ms
95th Percentile       : ${p95ResponseTime.toFixed(2)} ms
System Availability   : ${availability.toFixed(2)}%
Total Test Duration   : ${totalDuration.toFixed(2)} seconds
=============================================

HTML report was generated as 'summary.html' - open this file in a browser to view graphs.
`;

  console.log("Generating HTML report with visualizations...");

  // Generate HTML report dengan grafik
  return {
    stdout: performanceSummary,
    "summary.html": htmlReport(data, {
      enableCharts: true, // Ensure charts are enabled
    }),
    "summary.json": JSON.stringify(data, null, 2),
  };
}
