
import { EmailService, SendEmailOptions } from './email.service';
import  nodemailer from 'nodemailer';


describe('emailService.ts', () => { 

  const mockSendMail = jest.fn();                               // Mock del método sendMail de la clase EmailService

  //Mock al createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({      // Mock del transport de nodemailer que devolverá un mock del método sendMail
    sendMail: mockSendMail
  })

  const emailService = new EmailService();

  test('should send email', async() => {
    
    const options: SendEmailOptions = {
      to: 'usuario@gmail.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>'
    }

    const emailSent = await emailService.sendEmail(options)
  
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test</h1>",
      subject: "Test",
      to: "usuario@gmail.com",
    })
  });

  test('should send email with attachments', async() => {

    const email = 'usuario@gmail.com'
    await emailService.sendEmailWithFileSystemLogs(email)
  
    expect( mockSendMail ).toHaveBeenCalledWith({
      to: email,
      subject: 'Logs del servidor',
      html: expect.any(String),
      attachments: expect.arrayContaining([
        { filename: 'logs-all.log', path: './logs/logs-all.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
      ])
    })
  
  });
  
  
})