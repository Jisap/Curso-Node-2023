import { envs } from "../config/plugins/envs";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl( // Repository de infrastructure(datasource de infraestructura)
  new FileSystemDataSource  
)

export class Server {
  
  public static start() {

    console.log('Server started...');

    // Mandar email
    const emailService = new EmailService();
    emailService.sendEmail({
      to: 'jorgematosminguez@gmail.com',
      subject: 'Logs de sistema',
      htmlBody: `
        <h3>Logs de sistema NOC</h3>
        <p>Lorem velit non veniam ullamco ex eu laborum deserunt</p>
        <p>Ver logs adjuntos</p>
        `
    })

    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https:google.com'
    //     new CheckService(
    //       fileSystemLogRepository,           // inyección del repository Impl       
    //       () => console.log(`${url} is ok`), // inyección de dependencias
    //       (error) => console.log(error)  
    //     ).execute(url)
    //     //new CheckService().execute('http:/localhost:3000')
    //   }  
    // );
   
  }
}