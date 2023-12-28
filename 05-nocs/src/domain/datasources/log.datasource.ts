import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

// Reglas de negocio para los datasources

export abstract class LogDataSource {

  abstract saveLog( log: LogEntity): Promise<void>;
  abstract getLogs( severityLevel: LogSeverityLevel): Promise<LogEntity[]>

}