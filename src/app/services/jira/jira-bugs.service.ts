import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class JIRABugsService {
  constructor(private authService: NbAuthService, private httpClient: HttpClient) {}

  getProductionBugs() {
    return new Observable((observer) => {
      this.authService.getToken().subscribe((val: any) => {
        this.httpClient
          .post('http://localhost:4201/production-bugs', {
            token: val.token,
          })
          .subscribe((bugs) => {
            observer.next(bugs);
          });
      });
    });
  }
}
