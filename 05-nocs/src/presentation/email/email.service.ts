import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs'

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachement[];
}

interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  });

  async sendEmail(options:SendEmailOptions):Promise<boolean>{
  
    const { to, subject, htmlBody, attachments=[] } = options

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments
      });

      console.log(sentInformation)

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }


  async sendEmailWithFileSystemLogs( to: string | string[] ) {
    const subject = 'Logs del servidor';
    const htmlBody = `
      <h3>Logs de sistema NOC</h3>
        <p>Lorem velit non veniam ullamco ex eu laborum deserunt</p>
        <p>Ver logs adjuntos</p>
    `;

    const attachments:Attachement[] = [
      {filename: 'logs-all.log', path: './logs/logs-all.log'},
      {filename: 'logs-medium.log', path: './logs/logs-medium.log'},
      {filename: 'logs-high.log', path: './logs/logs-high.log'},
    ];

    return this.sendEmail({
      to, subject, attachments, htmlBody
    })
  }
}