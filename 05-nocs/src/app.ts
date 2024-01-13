

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

  //Crear una colección = tables, document = registro
  const newLog = await LogModel.create({
    message: 'Test message desde Mongo',
    origin: ' App.ts',
    level: 'low'
  });

  //await newLog.save();

  console.log(newLog)


  //Server.start()
}