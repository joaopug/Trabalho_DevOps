import http from "node:http";
import { createHealthPayload, createTraceId, writeLog } from "./observability.js";

const PORT = process.env.PORT || 3001;

function sendJson(res, statusCode, data, traceId) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Trace-Id",
    "X-Trace-Id": traceId,
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Body muito grande"));
      }
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const start = Date.now();
  const traceId = req.headers["x-trace-id"] || createTraceId();

  try {
    if (req.method === "OPTIONS") {
      return sendJson(res, 204, {}, traceId);
    }

    if ((req.method === "GET" || req.method === "HEAD") && req.url === "/health") {
      const payload = createHealthPayload();

      writeLog({
        level: "info",
        traceId,
        message: "Health check executado",
        details: { route: req.url, status: payload.status },
      });
      
      return sendJson(res, 200, payload, traceId);
    }

    if (req.method === "GET" && req.url === "/api/status") {
      return sendJson(res, 200, {
        message: "Microserviço de observabilidade ativo",
        traceId,
      }, traceId);
    }

    if (req.method === "POST" && req.url === "/api/logs") {
      const body = await readBody(req);
      const frontendLog = body ? JSON.parse(body) : {};

      writeLog({
        level: frontendLog.level || "info",
        traceId: frontendLog.traceId || traceId,
        message: frontendLog.message || "Evento recebido do frontend",
        details: frontendLog.details || {},
      });

      return sendJson(res, 201, { saved: true, traceId }, traceId);
    }

    writeLog({
      level: "warn",
      traceId,
      message: "Rota não encontrada",
      details: { method: req.method, route: req.url },
    });
    return sendJson(res, 404, { error: "Rota não encontrada", traceId }, traceId);
  } catch (error) {
    writeLog({
      level: "error",
      traceId,
      message: "Erro interno no microserviço",
      details: { error: error.message },
    });
    return sendJson(res, 500, { error: "Erro interno", traceId }, traceId);
  } finally {
    writeLog({
      level: "info",
      traceId,
      message: "Requisição finalizada",
      details: {
        method: req.method,
        route: req.url,
        duration_ms: Date.now() - start,
      },
    });
  }
});

server.listen(PORT, () => {
  writeLog({
    level: "info",
    traceId: createTraceId(),
    message: `Microserviço iniciado na porta ${PORT}`,
    details: { health_url: `http://localhost:${PORT}/health` },
  });
});
