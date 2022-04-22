import { createServer } from "./server";
import { log } from "logger";
import { PrismaClient } from "@prisma/client";

const port = process.env.PORT || 3000;
const server = createServer();
const prisma = new PrismaClient();

server.get("/", function (req, res) {
  res.send("Hello World!");
});

server.get("/prisma", async function (req, res) {
  res.send(
    JSON.stringify(await prisma.user.findMany({ select: { name: true } }))
  );
});

server.listen(port, () => {
  log(`api running on ${port}`);
});
