import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl( // Repository de infrastructure(datasource de infraestructura)
  new FileSystemDataSource  
)

export class Server {
  
  public static start() {

    console.log('Server started...');

    // Mandar email


    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https:google.com'
        new CheckService(
          fileSystemLogRepository,           // inyección del repository Impl       
          () => console.log(`${url} is ok`), // inyección de dependencias
          (error) => console.log(error)  
        ).execute(url)
        //new CheckService().execute('http:/localhost:3000')
      }  
    );
   
  }
}