import { TestBed } from '@angular/core/testing';

import { VerificationCodeService } from './verificationCode.service';

describe('MailService', () => {
  let service: VerificationCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificationCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
