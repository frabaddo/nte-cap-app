import { TestBed } from '@angular/core/testing';

import { ChangeModuleEnterGuard } from './change-module-enter.guard';

describe('ChangeModuleEnterGuard', () => {
  let guard: ChangeModuleEnterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChangeModuleEnterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
