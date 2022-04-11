import {
  request_time_histogram,
  request_time_summary,
  request_total_counter,
  request_logs,
} from "../config/prometheus";
import User from "../models/example-model";

class ExampleRoute {
  async getUser(req, res) {
    const id = req.query?.id || 1;

    const intialTime = Date.now();
    const user = await User.getUserById(id);
    request_logs.labels({
      date: new Date(),
      level: "INFO",
      method: "GET",
      msg: "Get user on database",
      statusCode: 200,
    });
    const durationTime = Date.now() - intialTime;

    request_time_histogram.observe(durationTime);
    request_time_summary.observe(durationTime);

    if (id % 2 === 0) {
      request_total_counter
        .labels({
          method: "GET",
          statusCode: 200,
        })
        .inc();
      request_logs
        .labels({
          date: new Date(),
          level: "INFO",
          method: "GET",
          msg: "Get user on database",
          statusCode: 200,
        })
        .inc();
      return res.status(200).json({ data: user });
    }

    request_total_counter
      .labels({
        method: "GET",
        statusCode: 400,
      })
      .inc();
    request_logs
      .labels({
        date: new Date(),
        level: "INFO",
        method: "GET",
        msg: "User not found",
        statusCode: 400,
      })
      .inc();
    return res.status(400).json({ error: "User not found" });
  }
}

export default new ExampleRoute();
