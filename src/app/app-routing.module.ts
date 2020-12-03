import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsConfig, getApps } from './apps.config';

declare const SystemJS: any;

/**
 * Lazy load remote bundle (AOT compatible!)
 */
export const loadRemoteChildren = (configuration: AppsConfig) => {
  // const importUrl = !!environment.devModulePrefixPath && name === environment.devModuleName
  //   ? `${environment.devModulePrefixPath}/bundle.umd.min.js` : `${url}/bundle.umd.min.js`;
  // const importUrl = '../../../entry/entry.module#EntryModule';
  const importUrl = `${configuration.devUrl || configuration.url}/bundle.umd.min.js`;

  return SystemJS.import(importUrl)
    .then((entryModule: any) => entryModule.EntryModule)
    .catch((err: any) => {
      handleLoadError(importUrl, err);
    });
};


const handleLoadError = function (url: any, err: any) {
  const msg = `Failed to load service from '${url}'.`;
  console.error(msg, err);
  // const msgEncoded = encodeURIComponent(msg);
  // window.location.href = `/error/${msgEncoded}`;
};
const routes: Routes = [
  {
    path: 'services',
    children: getApps().map(item => {
      return {
        path: item.path,
        loadChildren: () => loadRemoteChildren(item)
      };
    })
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
