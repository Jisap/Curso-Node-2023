
import { ServerApp } from './server-app'


describe('server-app.ts', () => {
  
  test('should create ServerApp instance', () => { 
  
    const serverApp = new ServerApp()
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function')
  })
});
