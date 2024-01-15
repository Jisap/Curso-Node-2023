

import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs";
import { LogModel, MongoDatabase } from "./data/mongoose";

import { Server } from "./presentation/server";



(async () => {
  main()
})();


async function main() {

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,

  });

  const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'Test',
  //     origin: 'APP'
  //   }
  // });

  const logs = await prisma.logModel.findMany({
    where: {
      level: 'MEDIUM'
    }
  });
  console.log(logs)

  //Server.start()
}