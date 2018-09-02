import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JIRABugsService {
  constructor(private authService: NbAuthService, private httpClient: HttpClient) {}

  getProductionBugs() {
    // return this.authService.getToken().subscribe((val) => {
    // console.log(val.token);
    return this.httpClient.post('http://localhost:4201/production-bugs', {
      token: 'cmFyYW1ha3Jpc2huYTptZUBFR0AxMjEy',
    });
    // });
  }
}
