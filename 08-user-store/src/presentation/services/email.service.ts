import nodemailer, { Transporter } from 'nodemailer';


export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}


export class EmailService {

  private transporter: Transporter;



  constructor( 
    mailerService: string,
    mailerEmail: string,  
    senderEmailPassword: string,
    private readonly postToProvider: boolean, // env para establecer si enviamos o no el correo de verificación
  ) { 
    this.transporter = nodemailer.createTransport({
        service: mailerService,
        auth: {
          user: mailerEmail,
          pass: senderEmailPassword,
        }
      });  
  }


  async sendEmail(options: SendMailOptions): Promise<boolean> {     // Envía un email con un link que contiene un token basado en el email a validar

    const { to, subject, htmlBody, attachements = [] } = options;


    try {

      if(!this.postToProvider) return true;   // Si la variable de entorno SEND_EMAIL=false no enviamos el correo de verificacióncd 08

      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      // console.log( sentInformation );

      return true;
    } catch (error) {
      return false;
    }

  }

}


