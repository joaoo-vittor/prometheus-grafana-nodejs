import {
  request_total_counter,
  request_time_histogram,
  request_time_summary,
  usuarios_logados,
} from "../config/prometheus";
import User from "../models/example-model";

class ExampleRoute {
  async getUser(req, res) {
    const endTimeHistogram = request_time_histogram.startTimer({
      route: "/user",
    });
    const endTimeSummary = request_time_summary.startTimer({ route: "/user" });
    const id = req.query?.id || 1;

    const user = await User.getUserById(id);

    usuarios_logados.set(100 * Math.random());

    if (id % 2 === 0) {
      request_total_counter.labels("GET", "/user", "200").inc();

      endTimeHistogram();
      endTimeSummary();
      return res.status(200).json({ data: user });
    }

    endTimeHistogram();
    endTimeSummary();
    request_total_counter.labels("GET", "/user", "400").inc();
    return res.status(400).json({ error: "User not found" });
  }
}

export default new ExampleRoute();
