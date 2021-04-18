import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.listen(3000, () => console.log("Listening at port 3000!"));
};
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
