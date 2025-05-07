import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Trend } from "k6/metrics"; // Import metrics

export let options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "1m", target: 10 },
    { duration: "30s", target: 0 },
  ],
};

const BASE_URL = "http://praktik-dr-hema.my.id/";

// Define custom metrics
let successfulRequests = new Counter("successful_requests");
let failedRequests = new Counter("failed_requests");
let responseTimes = new Trend("response_times");

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
  for (const route of protectedRoutes) {
    const res = http.get(`${BASE_URL}${route}`, { redirects: 0 });
    const success = check(res, {
      [`GET ${route} status != 200`]: (r) => r.status !== 200,
    });

    if (success) {
      successfulRequests.add(1);
    } else {
      failedRequests.add(1);
    }

    // Record response time for the request
    responseTimes.add(res.timings.duration);

    sleep(1);
  }

  // Test public routes
  ["/register", "/login", "/buat-janji", "/"].forEach((route) => {
    const res = http.get(`${BASE_URL}${route}`);
    const success = check(res, {
      [`GET ${route} status 200`]: (r) => r.status === 200,
    });

    if (success) {
      successfulRequests.add(1);
    } else {
      failedRequests.add(1);
    }

    // Record response time for the request
    responseTimes.add(res.timings.duration);

    sleep(1);
  });
}

export function handleSummary(data) {
  // Get the total requests from http_reqs.count
  const totalRequests = data.metrics["http_reqs"]
    ? data.metrics["http_reqs"].values.count
    : 0;

  // Get successful requests from successful_requests.count
  const successCount = data.metrics["successful_requests"]
    ? data.metrics["successful_requests"].values.count
    : 0;

  // Get failed requests from http_req_failed.count
  const failedCount = data.metrics["http_req_failed"]
    ? data.metrics["http_req_failed"].values.fails
    : 0;

  // Calculate total duration from iteration_duration
  const totalDuration = data.metrics["iteration_duration"]
    ? data.metrics["iteration_duration"].values.avg *
      data.metrics["iterations"].values.count
    : 0;

  // Calculate availability
  const availability =
    totalRequests > 0 ? (successCount / totalRequests) * 100 : 0;

  // Get response time metrics
  const minResponseTime = data.metrics["response_times"]
    ? data.metrics["response_times"].values.min
    : 0;
  const maxResponseTime = data.metrics["response_times"]
    ? data.metrics["response_times"].values.max
    : 0;
  const avgResponseTime = data.metrics["response_times"]
    ? data.metrics["response_times"].values.avg
    : 0;

  // Generate the performance summary string
  const performanceSummary = `
========== PERFORMANCE TEST SUMMARY ==========
Total Requests       : ${totalRequests}
Successful Requests  : ${successCount}
Failed Requests      : ${failedCount}
Error Rate           : ${
    totalRequests > 0 ? ((failedCount / totalRequests) * 100).toFixed(2) : 0
  }%
Average Response Time: ${avgResponseTime.toFixed(2)} ms
Min Response Time    : ${minResponseTime.toFixed(2)} ms
Max Response Time    : ${maxResponseTime.toFixed(2)} ms
System Availability  : ${availability.toFixed(2)}%
Total Test Duration  : ${(totalDuration / 1000).toFixed(2)} seconds
=============================================
`;

  // Return summary and the full metrics object
  return {
    stdout: `${performanceSummary}\n` + JSON.stringify(data.metrics, null, 2),
  };
}
