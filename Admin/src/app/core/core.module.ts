import {NgModule} from '@angular/core';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    LogoComponent,
  ],
  declarations: [LogoComponent]
})
export class CoreModule {}
