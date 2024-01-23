import { mock } from 'node:test';
import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDataSource } from './log.datasource';



describe('log.datasource.ts LogDatasource', () => { 

  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test-message',
    level: LogSeverityLevel.low,
  })

  class MockLogDataosurce implements LogDataSource {
    
    async saveLog(log: LogEntity): Promise<void> {
      return
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog]
    }
    
  }


  test('should test abstract class', async() => { 
    
    const mockLogDataSource = new MockLogDataosurce();

    expect(mockLogDataSource).toBeInstanceOf( MockLogDataosurce )
    expect(typeof mockLogDataSource.saveLog).toBe('function');
    expect(typeof mockLogDataSource.getLogs).toBe('function');

    await mockLogDataSource.saveLog(newLog);
    const logs = await mockLogDataSource.getLogs(LogSeverityLevel.high); // Da igual el severityLevel porque getLogs devuelve siempre un [newLog]
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});