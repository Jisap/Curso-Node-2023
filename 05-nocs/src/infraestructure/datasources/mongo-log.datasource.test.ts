import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs";
import { LogModel, MongoDatabase } from "../../data/mongoose";
import { MongoLogDatasource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogDataSource } from '../../domain/datasources/log.datasource';




describe('Pruebas en MongoLogDatasource', () => { 

  const logDataSource = new MongoLogDatasource(); // Instancia de Datasource infraestructure ( contiene la lógica para grabar y obtener logs) 
  const log = new LogEntity({                     // logEntity
    level: LogSeverityLevel.medium,
    message: 'test message',
    origin: 'mongo-log.datasource.test.ts'
  });

  beforeAll(async() => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    })
  });

  afterEach(async() => {
    await LogModel.deleteMany();
  })

  afterAll(async() => {
    mongoose.connection.close();
  });

  test('Should create a log', async() => {
    
    const logSpy = jest.spyOn(console, 'log');      // Monitorizamos el método console.log  
  
    await logDataSource.saveLog(log);               // Grabamos logs
  
    expect( logSpy ).toHaveBeenCalled()
    expect( logSpy ).toHaveBeenCalledWith("Mongo Log created: ", expect.any(String))
  });

  test('should get logs', async() => { 

    await logDataSource.saveLog(log);
    const logs = await logDataSource.getLogs(LogSeverityLevel.medium);

    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogSeverityLevel.medium);
    
  });
  
  
})