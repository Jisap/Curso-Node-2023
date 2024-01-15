import { envs } from "../config/plugins/envs";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl( // Repository de infrastructure(datasource de infraestructura)
  new FileSystemDataSource()  
);

const logRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
)

const emailService = new EmailService()

export class Server {
  
  public static async start() {

    console.log('Server started...');

    // Mandar email
    // new SendEmailLogs(            // use-case
    //   emailService,               // Envia emails con attachments 
    //   fileSystemLogRepository,    // Graba logs
    // ).execute("usuario@gmail.com")

    // const logs = await logRepository.getLogs(LogSeverityLevel.low)
    // console.log(logs)

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https:google.com'
    //     new CheckService(
    //       //fileSystemLogRepository,           // inyección del repository Impl de fileSystem      
    //       logRepository,                       // inyección del repository Impl de MongoLogs
    //       () => console.log(`${url} is ok`), // inyección de dependencias
    //       (error) => console.log(error)  
    //     ).execute(url);
    //     //new CheckService().execute('http:/localhost:3000')
    //   }  
    // );
   
  }
}