import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs'

export class FileSystemDataSource implements LogDataSource {
  
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-all.log';
  private readonly mediumLogsPath = 'logs/log-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  constructor(){
    this.createLogsFiles();                 // Para usar los métodos del datasource necesitaremo esta función
  }

  private createLogsFiles = () => {         
    if( !fs.existsSync(this.logPath) ){     // Crea el directorio de logs sino existe
      fs.mkdirSync(this.logPath)
    }

    [
      this.allLogsPath,                      // Crea los archivos de logs sino existen 
      this.mediumLogsPath,
      this.highLogsPath,
    ].forEach( path => {
      if( fs.existsSync(path)) return;
      fs.writeFileSync(path, '');
    })
  }

  async saveLog(newLog: LogEntity): Promise<void> {

    const logAsJson = `${JSON.stringify(newLog)}\n`
    
    fs.appendFileSync( this.allLogsPath, logAsJson );

    if( newLog.level === LogSeverityLevel.low) return;

    if( newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson );
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }



  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }


}