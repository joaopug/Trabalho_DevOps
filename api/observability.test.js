import test from "node:test";
import assert from "node:assert";
import { createHealthPayload, createLogLine } from "./observability.js";

test("health check retorna status ok", () => {
  const health = createHealthPayload();
  assert.equal(health.status, "ok");
  assert.equal(health.service, "banana-health-service");
  assert.ok(health.timestamp);
});

test("log contém mensagem e traceId", () => {
  const line = createLogLine({
    level: "info",
    traceId: "abc-123",
    message: "Teste de log",
  });

  const parsed = JSON.parse(line);
  assert.equal(parsed.level, "info");
  assert.equal(parsed.traceId, "abc-123");
  assert.equal(parsed.message, "Teste de log");
});
