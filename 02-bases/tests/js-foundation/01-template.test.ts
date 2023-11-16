import { emailTemplate } from '../../src/js-foundation/01-template';


describe('js-foundation/01-template', () => {
  
  test('emailTempate should contain a greeting', () => {
    
    expect( emailTemplate ).toContain('Hi, ');

  });

  test('emailTemplate should contain {{name}} and {{orderId}}', () => { 
  
      expect(emailTemplate).toMatch(/{{name}}/);
      expect(emailTemplate).toMatch(/{{orderId}}/);

      expect(emailTemplate).toContain('{{name}}');
      expect(emailTemplate).toMatch('{{orderId}}');
  })



});
