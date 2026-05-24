import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import process from "node:process";

const LOG_DIR = path.resolve("logs");
const LOG_FILE = path.join(LOG_DIR, "app.log");

export function createTraceId() {
  return crypto.randomUUID();
}

function getBrasiliaTimestamp() {
  return new Date()
    .toLocaleString("sv-SE", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(" ", "T");
}

export function createHealthPayload() {
  return {
    status: "ok",
    service: "banana-health-service",
    timestamp: getBrasiliaTimestamp(),
    uptime_seconds: Math.round(process.uptime()),
    memory_mb: Math.round(process.memoryUsage().rss / 1024 / 1024),
  };
}

export function createLogLine({
  level = "info",
  message,
  traceId,
  details = {},
}) {
  return JSON.stringify({
    timestamp: getBrasiliaTimestamp(),
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
