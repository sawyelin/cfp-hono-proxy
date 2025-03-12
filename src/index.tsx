import { Hono } from "hono";
import { proxy } from "hono/proxy";
import { renderer } from "./renderer";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(
    <div>
      <a href="/setup.ps1">Windows setup tool</a>
      <br />
      <a href="/setup.sh">Ubuntu setup tool</a>
    </div>,
  );
});

app.get("/setup.ps1", (c) => {
  return proxy(
    "https://raw.githubusercontent.com/atolycs/setup-tools/refs/heads/main/win/deploy.ps1",
  );
});

app.get("/setup.sh", (c) => {
  return c.render(<h1>Ubuntu Hello world</h1>);
});

export default app;
