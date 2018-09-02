import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from '../@core/module-import-guard';
import { NbAuthModule } from '@nebular/auth';
import { JIRAModule } from './jira/jira-module';

export const NB_CORE_PROVIDERS = [...JIRAModule.forRoot().providers];

@NgModule({
  imports: [CommonModule],
  exports: [NbAuthModule],
  declarations: [],
})
export class ServicesModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: ServicesModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'ServicesModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServicesModule,
      providers: [...NB_CORE_PROVIDERS],
    };
  }
}
