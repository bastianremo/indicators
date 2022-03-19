import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedLoadingComponent } from './components/shared-loading/shared-loading.component';



@NgModule({
  declarations: [
    SharedLoadingComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SharedLoadingComponent
  ]
})
export class SharedModule { }
