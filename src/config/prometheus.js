import { Counter, Histogram, Summary } from "prom-client";

export const request_total_counter = new Counter({
  name: "request_total",
  help: "Contador de Requisições",
  labelNames: ["method", "statusCode"],
});

export const request_logs = new Counter({
  name: "request_logs",
  help: "Logs da aplicação",
  labelNames: ["date", "level", "method", "statusCode", "msg"],
});

export const request_time_histogram = new Histogram({
  name: "request_time_seconds",
  help: "Tempo de Resposta das Requisições",
  buckets: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
});

export const request_time_summary = new Summary({
  name: "summary_request_time_seconds",
  help: "Tempo de Resposta das Requisições",
  percentiles: [0.01, 0.05, 0.5, 0.9, 0.95, 0.99, 0.999],
});
