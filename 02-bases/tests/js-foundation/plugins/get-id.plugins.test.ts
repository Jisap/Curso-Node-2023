import { getUUID } from '../../../src/js-foundation/plugins/get-id.plugin';


describe('plugins/get-id.plugins.ts', () => {
  
  test('getUUID() should return a UUID', () => {
  
    const uuid = getUUID();

    expect( typeof uuid ).toBe('string');
    expect( uuid.length ).toBe(36);

  });


});
