import { ServerApp } from './presentation/server-app';



describe('Test App.ts', () => { 

  test('should call Server.run with values', async() => { 
  
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = ['node', 'app.ts', '-b', '10', '-l', '-s', '-n', 'test-file', '-d', 'test-destination']

    await import('./app');

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 10,
      showTable: true,
      fileName: 'test-file',
      destination: 'test-destination'
    })
  });

})