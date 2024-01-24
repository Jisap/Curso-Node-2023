import { LogEntity, LogSeverityLevel } from "./log.entity"



describe('LogEntity', () => { 

  const dataObj = {
    message: 'Hola mundo',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts'
  }

  test('should create a LogEntity instance', () => { 

    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a LogEntity instante from json', () => {
    
    const json = `{ "message": "Service medium level logs", "level": "medium", "createdAt": "2024-01-04T15:14:25.364Z", "origin": "check-service.ts" }`
  
    const log = LogEntity.fromJson(json)

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("Service medium level logs");
    expect(log.level).toBe("medium");
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test('should create a LogEntity from Object', () => {
    
    const log = LogEntity.fromObject(dataObj)

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);

  });
  
})