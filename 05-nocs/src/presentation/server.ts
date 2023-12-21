import { CronService } from "./cron/cron-service";



export class Server {
  public static start() {

    console.log('Server started...');

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const date = new Date();
        console.log('5 secons', date)
      }  
    );
    CronService.createJob(
      '*/2 * * * * *',
      () => {
        const date = new Date();
        console.log('2 secons', date)
      }
    );
    CronService.createJob(
      '*/3 * * * * *',
      () => {
        const date = new Date();
        console.log('3 secons', date)
      }
    );
  }
}