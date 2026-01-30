exports.handler = async (event) => {
  const code = Number((event.queryStringParameters || {}).code || 500);

  // Optional safety: allow only common test codes
  const allowed = [400, 404, 429, 500, 501, 502, 503, 504];
  const statusCode = allowed.includes(code) ? code : 500;

  return {
    statusCode,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store, no-cache, must-revalidate, max-age=0",
      "pragma": "no-cache"
    },
    body: JSON.stringify({
      message: "Intentional error for NEL testing",
      status: statusCode,
      ts: Date.now()
    })
  };
};