import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IndicatorsModule } from './indicators/indicators.module';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    IndicatorsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-ES" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
