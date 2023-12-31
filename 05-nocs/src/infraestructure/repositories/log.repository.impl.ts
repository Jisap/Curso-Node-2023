import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDataSource } from '../../domain/datasources/log.datasource';



export class LogRepositoryImpl implements LogRepository { // repositoryImpl infraestructure --> repository domain
  
  constructor (
    private readonly LogDataSource: LogDataSource         //  datasource domain
  ){}

  async saveLog(log: LogEntity): Promise<void> {  // Método del repo domain desarrollado con método del datasource domain
    return this.LogDataSource.saveLog( log );
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.LogDataSource.getLogs( severityLevel )
  }


}