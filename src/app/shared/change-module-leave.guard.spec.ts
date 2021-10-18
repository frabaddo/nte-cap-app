import { TestBed } from '@angular/core/testing';

import { ChangeModuleLeaveGuard } from './change-module-leave.guard';

describe('ChangeModuleLeaveGuard', () => {
  let guard: ChangeModuleLeaveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChangeModuleLeaveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
