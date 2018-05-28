import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { ClipchampBtn } from './clipchamp-btn/clipchamp.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    ClipchampBtn
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [ClipchampBtn]
})
export class AppModule {
  constructor(private injector: Injector) {
    const customElement = createCustomElement(ClipchampBtn, {injector});
    customElements.define('clipchamp-btn', customElement);
  }

  ngDoBootstrap() { }
}
