import {
  request_total_counter,
  request_time_histogram,
  usuarios_logados,
} from "../config/prometheus";

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

class ExampleRoute2 {
  async getUser(req, res) {
    // Inicializa a observação do tempo de resposta
    const endTimeHistogram = request_time_histogram.startTimer({
      route: "/user-2",
    });

    await sleep(Math.random() * 1000);

    const statusCode = Math.random() < 5 / 100 ? 400 : 200;

    // Atualiza o gauge de usuários logados
    usuarios_logados.set(500 + 50 * Math.random());

    // Contador de requisições
    request_total_counter.labels("GET", "/user-2", `${statusCode}`).inc();

    // Finaliza a observação do tempo de resposta
    endTimeHistogram();
    return res.status(statusCode).json({});
  }
}

export default new ExampleRoute2();
