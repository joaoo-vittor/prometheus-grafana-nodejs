// import os from "os";
import app from "./app";

// const { address } = os.networkInterfaces().eth0[0];

const port = Number(process.env.PORT) || 3001;
const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => {
  console.log(`CTRL + Click em http://${host}:${port}`);
});
