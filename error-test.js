/* ============================
   NETWORK ERROR SIMULATIONS
   ============================ */

/* 1️⃣ DNS Error */
document.getElementById("dnsBtn").onclick = () => {
  fetch("https://this-domain-should-not-exist-123456789.com")
    .catch(err => console.error("DNS Error", err));
};

/* 2️⃣ Connection Refused (NEL BEST CASE) */
document.getElementById("connBtn").onclick = () => {
  fetch("https://sagniks.netlify.app:444/test")
    .catch(err => console.error("Connection Error", err));
};

/* 3️⃣ Timeout Error */
document.getElementById("timeoutBtn").onclick = () => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 300);

  fetch("https://httpstat.us/200?sleep=5000", {
    signal: controller.signal
  }).catch(err => console.error("Timeout Error", err));
};

/* 4️⃣ HTTP 404 Error */
document.getElementById("httpBtn").onclick = () => {
  fetch("https://sagniks.netlify.app/does-not-exist")
    .then(r => {
      if (!r.ok) throw new Error("HTTP " + r.status);
    })
    .catch(err => console.error("HTTP Error", err));
};

/* ============================
   JAVASCRIPT ERRORS
   ============================ */

/* 5️⃣ JS Runtime Error */
document.getElementById("jsBtn").onclick = () => {
  nonExistentFunction(); // ReferenceError
};

/* 6️⃣ Promise Rejection */
document.getElementById("promiseBtn").onclick = () => {
  Promise.reject("Unhandled promise rejection");
};

function trigger5xx(code) {
  fetch(`/.netlify/functions/error?code=${code}&ts=${Date.now()}`, { cache: "no-store" })
    .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); })
    .catch(err => console.error(`HTTP ${code} Error`, err));
}

document.getElementById("e500").onclick = () => trigger5xx(500);
document.getElementById("e501").onclick = () => trigger5xx(501);
document.getElementById("e502").onclick = () => trigger5xx(502);
document.getElementById("e503").onclick = () => trigger5xx(503);
document.getElementById("e504").onclick = () => trigger5xx(504);