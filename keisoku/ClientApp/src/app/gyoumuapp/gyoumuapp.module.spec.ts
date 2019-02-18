import { GyoumuappModule } from './gyoumuapp.module';

describe('GyoumuappModule', () => {
  let gyoumuappModule: GyoumuappModule;

  beforeEach(() => {
    gyoumuappModule = new GyoumuappModule();
  });

  it('should create an instance', () => {
    expect(gyoumuappModule).toBeTruthy();
  });
});
