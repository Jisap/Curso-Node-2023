import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs'

export class FileSystemDataSource implements LogDataSource { // datasource (infraestructure) --> datasource (domain)
  
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

    const logAsJson = `${JSON.stringify(newLog)}\n`         // Método para hacer un string de un json con el newLog
    
    fs.appendFileSync( this.allLogsPath, logAsJson );       // 1º añade el log a "allLogsPath"

    if( newLog.level === LogSeverityLevel.low) return;      // 2º si level de newLog es bajo no se hace nada más

    if( newLog.level === LogSeverityLevel.medium) {         // 3º Si el level de newLog es medium se añade ademas "mediumLogsPath"
      fs.appendFileSync(this.mediumLogsPath, logAsJson );
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);      // 4º Si el level no es ninguno de los anteriores será High, se añade a "highLogsPath"
    }
  }

  private getLogsFromFile = (path: string):LogEntity[] => {
    const content = fs.readFileSync( path, 'utf-8' ); // Leemos el contenido
    const logs = content.split('\n').map(             // Separamos cada string por '\n'  
      log => LogEntity.fromJson(log)                  // Lo convertimos a json:LogEntity
    )
    return logs
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    
    switch( severityLevel ){
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);

      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);;

        case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);;

        default: 
          throw new Error(`${severityLevel} not implemented`)
    }
  }


}