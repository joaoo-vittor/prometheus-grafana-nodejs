import { Counter, Histogram, Summary, Gauge } from "prom-client";

export const request_total_counter = new Counter({
  name: "estudo_requests_total",
  help: "Contador de Requisições",
  labelNames: ["method", "route", "statusCode"],
});

export const usuarios_logados = new Gauge({
  name: "estudo_usuarios_logados_total",
  help: "Número de usuários logados no momento",
});

export const request_logs = new Counter({
  name: "estudo_request_logs",
  help: "Logs da aplicação",
  labelNames: ["date", "level", "method", "statusCode", "msg"],
});

export const request_time_histogram = new Histogram({
  name: "estudo_request_time_seconds_total",
  help: "Tempo de Resposta das Requisições",
  // buckets: [0.1, 0.2, 0.3, 0.4, 0.5],
  labelNames: ["route"],
});

export const request_time_summary = new Summary({
  name: "estudo_summary_request_time_seconds",
  help: "Tempo de Resposta das Requisições",
  percentiles: [0.1, 0.25, 0.5, 0.75, 0.9, 0.99],
  labelNames: ["route"],
});
