import { TestBed } from '@angular/core/testing';

import { PermisionInterceptorInterceptor } from './permision-interceptor.interceptor';

describe('PermisionInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PermisionInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PermisionInterceptorInterceptor = TestBed.inject(PermisionInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
