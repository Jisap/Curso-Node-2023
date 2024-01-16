import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogDataSource } from '../../domain/datasources/log.datasource';


const prismaClient = new PrismaClient();

const severityEnum = {                // tipos de severidad de los logs ( objeto )
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
}


export class PostgresLogDatasource implements LogDataSource {


  async saveLog(log: LogEntity): Promise<void> {

    const level = severityEnum[log.level];                  // Se obtiene el level de severidad basado en el del log que se pasa como arg

    const newLog = await prismaClient.logModel.create({     // Creamos y grabamos en bd el log según el level obtenido
      data: {
        ...log,
        level: level,
      }
    });

    // console.log('Posgres saved');
  }


  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    const level = severityEnum[severityLevel];

    const dbLogs = await prismaClient.logModel.findMany({
      where: { level }
    });

    return dbLogs.map(LogEntity.fromObject);
  }

}