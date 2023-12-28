import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

// Los repositorios llaman a los métodos del datasource

export abstract class LogRepository {

  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>

}