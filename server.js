const express = require("express");
const next = require("next");
const { getJobs } = require("./lib/freshjobs");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/api/freshjobs", async (req, res) => {
    const jobs = await getJobs();

    return res.json(jobs);
  });

  server.get("/:category(news|speakers|hosts|workshops)?/:slug", (req, res) => {
    return app.render(req, res, "/index", {
      category: req.params.category,
      slug: req.params.slug
    });
  });

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
