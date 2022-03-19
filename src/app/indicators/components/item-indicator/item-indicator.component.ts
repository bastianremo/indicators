import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Indicator } from 'src/app/classes/indicator';
import { IndicatorsService } from 'src/app/services/indicators.service';
import Swal from 'sweetalert2';
import { IndicatorSerieComponent } from './indicator-serie/indicator-serie.component';

@Component({
  selector: 'app-item-indicator',
  templateUrl: './item-indicator.component.html',
  styles: [
  ]
})
export class ItemIndicatorComponent implements OnInit {

  @Input() public indicator: Indicator = new Indicator();

  public indicatorSerie: Indicator[] = [];

  constructor(
    private _modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  showIndicatorType(indicator: Indicator) {
    const modal = this._modalService.open(IndicatorSerieComponent, { backdrop: 'static' })
    modal.componentInstance.indicator = indicator;   
  }

  openIndicatorDetail(indicator: Indicator){
    
  }

}
