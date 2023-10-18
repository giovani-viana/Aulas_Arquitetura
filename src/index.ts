/* eslint-disable import/first */
import dotenv from "dotenv-safe";
dotenv.config();
import "express-async-errors";
import http from "http";
import { prisma } from "./prisma";
import app from "./server";

const server = http.createServer(app);

server.listen(process.env.PORT, async () => {
  await prisma.$connect();
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down server");

  server.close(async () => {
    await prisma.$disconnect();
  });
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down server");

  server.close(async () => {
    await prisma.$disconnect();
  });
});
