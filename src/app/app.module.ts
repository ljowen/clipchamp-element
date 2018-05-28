import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { ClipchampComponent } from './clipchamp-btn/clipchamp.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    ClipchampComponent
  ],
  entryComponents: [
      ClipchampComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [ClipchampComponent]
})

export class AppModule {
  constructor(private injector: Injector) {
    const customElement = createCustomElement(ClipchampComponent, {injector});
    customElements.define('clipchamp-btn', customElement);
  }

  ngDoBootstrap() { }
}
