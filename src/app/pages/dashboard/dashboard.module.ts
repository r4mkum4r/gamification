import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { ProductionBugsComponent } from './production-bugs/production-bugs.component';

@NgModule({
  imports: [ThemeModule, NgxEchartsModule],
  declarations: [DashboardComponent, ProductionBugsComponent],
})
export class DashboardModule {}
