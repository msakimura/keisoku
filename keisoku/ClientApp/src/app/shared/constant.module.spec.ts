import { ConstantModule } from './constant.module';

describe('ConstantModule', () => {
  let constantModule: ConstantModule;

  beforeEach(() => {
    constantModule = new ConstantModule();
  });

  it('should create an instance', () => {
    expect(constantModule).toBeTruthy();
  });
});
