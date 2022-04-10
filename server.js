
import app from "./app";

const port = Number(process.env.PORT) || 3001;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
  console.log(`CTRL + Click em http://${host}:${port}`);
});
