import { BaseappModule } from './baseapp.module';

describe('BaseappModule', () => {
  let baseappModule: BaseappModule;

  beforeEach(() => {
    baseappModule = new BaseappModule();
  });

  it('should create an instance', () => {
    expect(baseappModule).toBeTruthy();
  });
});
