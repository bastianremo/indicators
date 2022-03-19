import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Indicator } from 'src/app/classes/indicator';
import { IndicatorsService } from 'src/app/services/indicators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'tests-indicator-serie',
  templateUrl: './indicator-serie.component.html',
  styles: [
  ]
})
export class IndicatorSerieComponent implements OnInit {

  @Input() public indicator: Indicator = new Indicator();

  public serie: Indicator[] = []

  public loading:Boolean = true;

  constructor(
    private _indicatorsService: IndicatorsService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.getIndicatorSerie();
  }

  getIndicatorSerie(){
    this.loading = true;
    this._indicatorsService.getIndicatorType(this.indicator.codigo).subscribe(res => {
      this.serie = res.serie;
      // this.serie = []
      this.loading = false;
    }, error => {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: `Ha ocurrido un error al obtener el detalle del indicador ${this.indicator.codigo}`
      })
    })
  }

}
