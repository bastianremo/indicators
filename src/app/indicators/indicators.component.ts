import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Indicator } from '../classes/indicator';
import { IndicatorsService } from '../services/indicators.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})
export class IndicatorsComponent implements OnInit {

  public indicators: Indicator[] = []

  public indicatorsFiltered: Indicator[] = []

  public filter: string;

  public loading: Boolean = true;

  public showFilter: Boolean = false;

  constructor(
    private _indicatorsService: IndicatorsService
  ) { }

  ngOnInit(): void {
    this.getIndicators()
  }

  getIndicators() {
    this.loading = true;
    this._indicatorsService.getIndicators().subscribe(res => {
      // Object.values(res).filter(item => typeof item === 'object')

      this.indicators = Object
        .values(res) // Transforma el objeto a un arreglo
        .filter((item: any) => item.codigo) // Filtra todos los items con que tenga la propiedad código
        .sort((a: any, b: any) => { // Ordena lo filtrado con el nombre
          if (a.nombre > b.nombre) return 1;
          if (a.nombre < b.nombre) return -1;
          return 0;
        })
        .map((item: any) => new Indicator(item)) // Modifica el item con la clase Indicator
      this.indicatorsFiltered = this.indicators;
      this.loading = false;
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Ha ocurrido un error al obtener la información de los indicadores',
      })
      this.loading = false;
    });
  }

  searchIndicator() {
    this.indicatorsFiltered = this.indicators;
    this.indicatorsFiltered = this.indicatorsFiltered.filter(item => this.removeAccentMark(item.nombre).includes(this.filter.toLowerCase())
      || this.removeAccentMark(item.unidad_medida).includes(this.filter.toLowerCase()))
  }

  removeAccentMark(value: string) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase()
  }

}
