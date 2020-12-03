import { Component } from '@angular/core';
import { getApps } from './apps.config';
import { ComponentLoaderService } from './services/component-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mf-root';

  constructor(private _componentLoaderService: ComponentLoaderService) {
    // this.loadGlobalBundles();
  }

  // loadGlobalBundles() {
  //   getApps().forEach(app => this._componentLoaderService.updateModule(app));
  // }
}
