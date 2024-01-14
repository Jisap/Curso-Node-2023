
export enum LogSeverityLevel {
  low='low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {

  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin:string;
}

export class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;    // Indica en que archivo se disparo el log

  constructor( options: LogEntityOptions) {

    const { message, level, origin, createdAt = new Date() } = options

    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = ( json:string ):LogEntity => {           // Este método transforma un json stringify en un LogEntity
    
    json = (json === '') ? '{}' : json;

    const {message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({ message, level, createdAt, origin });
    
    return log;
  };

  static fromObject = (object: { [key:string]: any }): LogEntity => { // Convertimos un objeto model de mongo a LogEntity 
    const { message, level, createdAt, origin } = object
    const log = new LogEntity({
      message, 
      level, 
      createdAt, 
      origin
    });

    return log;
  }

}