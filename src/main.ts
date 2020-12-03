import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as common from '@angular/common';
import * as commonHttp from '@angular/common/http';
import * as core from '@angular/core';
import * as router from '@angular/router';
import * as forms from '@angular/forms';
import * as aPlatformBrowser from '@angular/platform-browser';
import * as tslib from 'tslib';



declare const SystemJS: any;


SystemJS.set('@angular/core', SystemJS.newModule(core));
SystemJS.set('@angular/common', SystemJS.newModule(common));
SystemJS.set('@angular/common/http', SystemJS.newModule(commonHttp));
SystemJS.set('@angular/router', SystemJS.newModule(router));
SystemJS.set('@angular/forms', SystemJS.newModule(forms));
SystemJS.set('@angular/platform-browser', SystemJS.newModule(aPlatformBrowser));
SystemJS.set('tslib', SystemJS.newModule(tslib));



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
