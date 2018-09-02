import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class JIRAAuthService {
  constructor(private httpClient: NbAuthService) {}

  getToken() {}
}
