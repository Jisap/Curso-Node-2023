import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from './check-service-multiple';


describe('CheckService UseCase', () => {

  const mockRepo1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const mockRepo2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const mockRepo3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const succesCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkservice = new CheckServiceMultiple(
    [mockRepo1, mockRepo2, mockRepo3],
    succesCallback,
    errorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('should call successCallback when fetch return true', async () => {

    const wasOk = await checkservice.execute('https://google.com')
    expect(wasOk).toBe(true);
    expect(succesCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(mockRepo1.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    )
  });

  test('should call errorCallback when fetch return false', async () => {

    const wasOk = await checkservice.execute('https://sdfgdgfggoogle.com')
    expect(wasOk).toBe(false);
    expect(succesCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(mockRepo1.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    )
  });

});
