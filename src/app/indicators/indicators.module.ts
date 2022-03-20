import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { IndicatorsComponent } from './indicators.component';
import { HttpClientModule } from '@angular/common/http';
import { IndicatorsService } from '../services/indicators.service';
import { ItemIndicatorComponent } from './components/item-indicator/item-indicator.component';
import { SharedModule } from '../shared/shared.module';
import { IndicatorSerieComponent } from './components/item-indicator/indicator-serie/indicator-serie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IndicatorDetailComponent } from './components/item-indicator/indicator-detail/indicator-detail.component';
import { NgApexchartsModule } from 'ng-apexcharts'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    IndicatorsComponent,
    ItemIndicatorComponent,
    IndicatorSerieComponent,
    IndicatorDetailComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NgbTooltipModule
  ],
  exports: [
    IndicatorsComponent
  ],
  providers: [
    IndicatorsService,
    DecimalPipe
  ]
})
export class IndicatorsModule { }
