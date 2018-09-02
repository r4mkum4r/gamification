import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JIRABugsService } from './jira-bugs.service';

const SERVICES = [JIRABugsService];

@NgModule({
  imports: [CommonModule],
})
export class JIRAModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: JIRAModule,
      providers: [...SERVICES],
    };
  }
}
