/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbThemeModule } from '@nebular/theme';
import { AuthGuard } from './guards';
import { EGELoginComponent } from './auth/login/login.component';
import { EGEAuthComponent } from './auth';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from './services/services-module';

@NgModule({
  declarations: [AppComponent, EGELoginComponent, EGEAuthComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,

    ThemeModule.forRoot(),
    NgbModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    CoreModule.forRoot(),
    ServicesModule.forRoot(),

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:4201',
          token: {
            getter: (module: String, response: HttpResponse<any>) => {
              return response.body.token;
            },
          },
          login: {
            endpoint: '/login',
            method: 'post',
            redirect: {
              success: '/pages/dashboard',
              failure: '/auth/login',
            },
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
          socialLinks: [],
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthGuard],
})
export class AppModule {}
