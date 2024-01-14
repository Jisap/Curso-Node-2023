import { LogModel } from "../../data/mongoose";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoLogDatasource implements LogDataSource {

  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);      // Instancia de model y grabación en bd
    console.log('Mongo Log created: ', newLog.id);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({              // Busca en bd según severityLevel
      level: severityLevel
    });

    return logs.map((mongoLog) => LogEntity.fromObject(mongoLog));  // Convertimos objeto de mongo en entity
  }

}