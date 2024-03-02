import { Server } from '../src/presentation/server';
import { envs } from '../src/config/envs';

jest.mock('../src/presentation/server'); // Mock del server.ts


describe('Testing App.ts', () => { 

  test('should call server start with arguments and start', async() => {

    await import('../src/app');  // Importación del app.ts

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      "public_path": envs.PUBLIC_PATH,
      routes: expect.any(Function)
    });

    expect(Server.prototype.start).toHaveBeenCalled()
  })
})