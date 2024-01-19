import { envs } from "./envs"


describe('envs.plugin.ts', () => {

  test('should return env options', () => { 
  
    expect( envs ).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'jisapjisap@gmail.com',
      MAILER_SECRET_KEY: 'havhbnbkudkhwjdt',
      PROD: false,
      MONGO_URL: 'mongodb://localhost:27017/?authSource=admin',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'jisap',
      MONGO_PASS: '123456789',
      POSTGRES_URL: 'postgresql://postgres:123456789@localhost:5432/NOC-TESt',
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: '123456789',
      POSTGRES_DB: 'NOC-TEST'
    })
  })

  test('should return error if not found env', async() => {
    
    jest.resetModules();
    process.env.PORT = 'ABC'; // Al poner un puerto no válido siempre llegariamos al catch del error que es donde esta la prueba

    try {
      await import('./envs');
      expect(true).toBe(false)
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer')
    }
  })
})