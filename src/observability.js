const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function createTraceId() {
  return crypto.randomUUID();
}

export async function sendFrontendLog(message, details = {}, level = "info") {
  const traceId = createTraceId();

  console.log(JSON.stringify({
    level,
    traceId,
    message,
    details,
    timestamp: new Date().toISOString(),
  }));

  try {
    await fetch(`${API_URL}/api/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Trace-Id": traceId,
      },
      body: JSON.stringify({ level, traceId, message, details }),
    });
  } catch {
    console.warn("Não foi possível enviar o log para o microserviço.");
  }
}
