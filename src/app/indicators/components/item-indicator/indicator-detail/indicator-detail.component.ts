import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Indicator } from 'src/app/classes/indicator';
import { IndicatorsService } from 'src/app/services/indicators.service';
import Swal from 'sweetalert2';
import * as moment from 'moment'
import { ChartComponent } from "ng-apexcharts";
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css']
})
export class IndicatorDetailComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: any;

  @Input() public indicator: Indicator = new Indicator();

  public serie: Indicator[] = []

  public loading: Boolean = true;

  constructor(
    private _indicatorsService: IndicatorsService,
    public activeModal: NgbActiveModal,
    public _decimalPipe: DecimalPipe
  ) { }

  ngOnInit(): void {
    this.getIndicatorSerie();

  }

  getIndicatorSerie() {
    this.loading = true;
    this._indicatorsService.getIndicatorType(this.indicator.codigo).subscribe(res => {
      this.serie = res.serie;
      const last10Items = this.serie
        .sort((a: any, b: any) => b.fecha - a.fecha)
        .slice(0, 10)
        .reverse()

      this.chartOptions = {
        dataLabels: {
          enabled: true,
          formatter: (val: any, opts: any) => {
            let formated = this._decimalPipe.transform(val, undefined, 'es')
            if (this.indicator.unidad_medida == 'Porcentaje')
              formated += '%'
            else
              formated = '$' + formated;

            return formated
          },
        },
        series: [
          {
            name: "Valor",
            data: last10Items.map(item => item.valor)
          }
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: false,
          toolbar: {
            show: false
          },
          animations: {
            enabled: false,
          }
        },
        xaxis: {
          categories: last10Items.map(item => moment(item.fecha).format('YYYY-MM-DD')),
        },
        yaxis: {
          show: true,
          labels: {
            formatter: (value: any) => {
              let formated = this._decimalPipe.transform(value, undefined, 'es')
              if (this.indicator.unidad_medida == 'Porcentaje')
                formated += ' %'
              else
                formated = '$ ' + formated;

              return formated
            }
          }
        }
      };
      this.loading = false;
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: `Ha ocurrido un error al obtener el detalle del indicador ${this.indicator.nombre}`
      })
      this.loading = false;
    })
  }

}
