function logError(type, err) {
  console.error(`[${type}]`, err);
}

/**
 * DNS error
 */
document.getElementById("dnsBtn").onclick = () => {
  fetch("https://this-domain-should-not-exist-987654.com/test")
    .catch(err => logError("DNS ERROR", err));
};

/**
 * Connection refused error
 */
document.getElementById("connBtn").onclick = () => {
  fetch("http://127.0.0.1:81/test")
    .catch(err => logError("CONNECTION ERROR", err));
};

/**
 * Timeout error
 */
document.getElementById("timeoutBtn").onclick = () => {
  fetch("http://10.255.255.1")
    .catch(err => logError("TIMEOUT ERROR", err));
};

/**
 * HTTP 404 error (note: fetch resolves, does not reject)
 */
document.getElementById("httpBtn").onclick = () => {
  fetch("https://jsonplaceholder.typicode.com/does-not-exist")
    .then(res => {
      console.log("HTTP STATUS:", res.status);
    });
};

/**
 * JavaScript runtime error
 */
document.getElementById("jsBtn").onclick = () => {
  throw new Error("Intentional JavaScript runtime error");
};

/**
 * Promise rejection error
 */
document.getElementById("promiseBtn").onclick = () => {
  Promise.reject(new Error("Intentional unhandled promise rejection"));
};
