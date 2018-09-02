import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  public server: String = 'https://jira.expedia.biz';
  public api: String = 'rest/api/2';
  public serverWithAPI: String = `{this.server}/{this.api}`;
}
