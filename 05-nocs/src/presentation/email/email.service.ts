import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs'
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

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

  private transporter = nodemailer.createTransport({              // Configuración para envio de emails con gmail
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  });

  constructor(){}

  async sendEmail(options:SendEmailOptions):Promise<boolean>{     // Método para enviar el email y grabar logs
  
    const { to, subject, htmlBody, attachments=[] } = options

    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments
      });

      return true
    } catch (error) {
      console.log(error)
      
      return false
    }
  }


  async sendEmailWithFileSystemLogs( to: string | string[] ) {  // Método para enviar email con attachments y grabar logs
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