import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDataSource implements LogDataSource {
  
  private readonly logPath = 'logs/'

  saveLog(log: LogEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }


}