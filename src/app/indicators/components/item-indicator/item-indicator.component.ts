import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Indicator } from 'src/app/classes/indicator';
import { IndicatorDetailComponent } from './indicator-detail/indicator-detail.component';
import { IndicatorSerieComponent } from './indicator-serie/indicator-serie.component';

@Component({
  selector: 'app-item-indicator',
  templateUrl: './item-indicator.component.html',
  styleUrls: ['./item-indicator.component.css']
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
    const modal = this._modalService.open(IndicatorSerieComponent)
    modal.componentInstance.indicator = indicator;
  }

  openIndicatorDetail(indicator: Indicator) {
    const modal = this._modalService.open(IndicatorDetailComponent)
    modal.componentInstance.indicator = indicator;
  }
}
