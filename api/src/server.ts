import "./lib/env";
import { app } from "./app";
import { connectDb } from "./lib/db";

const PORT = Number(process.env.PORT || 4000);

async function start() {
  await connectDb();
  app.listen(PORT, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on :${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
