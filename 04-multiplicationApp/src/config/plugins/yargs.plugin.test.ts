
const runCommand = async ( args: string[]) => {
  process.argv = [ ...process.argv, ...args];
  const { yarg } = await import('./yargs.plugin');
  return yarg
}

describe('Test args.plugin.ts', () => {

  const orginalArgv = process.argv;

  beforeEach(() => {
    process.argv = orginalArgv;
    jest.resetModules();
  })
  
  test('should return default values', async() => { 
    
    const argv = await runCommand(['-b', '5'])
    
    expect(argv).toEqual( expect.objectContaining({
      b: 5,
      l: 10,
      s: false,
      n: 'multiplication-table',
      d: './outputs',
    }))
  })

  test('should return configuration with custom values', async() => {
  
    const argv = await runCommand(['-b','5','-l','20','-s','-n','custom-name', '-d', 'custom-dir'])
  
    expect(argv).toEqual(expect.objectContaining({
      b: 5,
      l: 20,
      s: true,
      n: 'custom-name',
      d: 'custom-dir',
    }))
  })
});
