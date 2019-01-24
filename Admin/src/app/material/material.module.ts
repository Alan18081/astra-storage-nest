import {
  MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule,
  MatInputModule, MatNativeDateModule, MatProgressBarModule
} from '@angular/material';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const modules = [
  BrowserAnimationsModule,
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class MaterialModule {}
