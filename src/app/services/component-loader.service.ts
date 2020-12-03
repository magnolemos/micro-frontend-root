import { Injectable, ComponentFactory, Compiler, Type } from '@angular/core';

// import * as SystemJS from 'systemjs'
import { AppsConfig } from '../apps.config';

// import { environment } from '../../../environments/environment';

declare const SystemJS: any;

export interface GlobalComponentStorage {
  [key: string]: ComponentFactory<any>;
}

interface ExtendedWindow extends Window {
  AppGlobalComponent: GlobalComponentStorage;
}

function _window(): ExtendedWindow {
   return window as any;
}

@Injectable({
    providedIn: 'root',
  })
export class ComponentLoaderService {
  constructor(private _compiler: Compiler) {
    _window().AppGlobalComponent = _window().AppGlobalComponent || { };
  }

  public updateModule(configuration: AppsConfig) {
    // const importUrl = !!environment.devModulePrefixPath && name === environment.devModuleName
    // ? `${environment.devModulePrefixPath}/global.bundle.umd.min.js` : `${configuration.url}/global.bundle.umd.min.js`;
    const importUrl = `${configuration.devUrl || configuration.url}/global.bundle.umd.min.js`;

    SystemJS.import(importUrl)
      .then((globalModule: { GlobalModule: Type<unknown>; }) => {
        const factories = this._compiler.compileModuleAndAllComponentsSync(globalModule.GlobalModule);
        factories.componentFactories.forEach(item => {
          this.addOrReplaceComponent(item.selector, item);
        });
      })
      .catch((err: any) => {
        console.error(`Failed to load global bundle: ${importUrl}. ${err}`);
      });
  }

  public addOrReplaceComponent(name: string, factory: ComponentFactory<any>) {
    _window().AppGlobalComponent[name] = factory;
  }
}
