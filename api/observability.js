import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const LOG_DIR = path.resolve("logs");
const LOG_FILE = path.join(LOG_DIR, "app.log");

export function createTraceId() {
  return crypto.randomUUID();
}

export function createHealthPayload() {
  return {
    status: "ok",
    service: "banana-health-service",
    timestamp: new Date().toISOString(),
    uptime_seconds: Math.round(process.uptime()),
    memory_mb: Math.round(process.memoryUsage().rss / 1024 / 1024),
  };
}

export function createLogLine({ level = "info", message, traceId, details = {} }) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    traceId,
    message,
    details,
  });
}

export function writeLog(logData) {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }

  const line = createLogLine(logData);
  fs.appendFileSync(LOG_FILE, `${line}\n`, "utf8");
  console.log(line);
}
