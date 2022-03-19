import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
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

  public indicatorsSaved: Indicator[] = []

  public loading: Boolean = true;

  public showFilter: Boolean = false;

  public form: FormGroup = this._formBuilder.group({});

  constructor(
    private _formBuilder: FormBuilder,
    private _indicatorsService: IndicatorsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getIndicators()
  }

  initForm() {
    this.form = this._formBuilder.group({
      name: [null]
    });
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
      this.indicatorsSaved = this.indicators;
      this.loading = false;
    }, error => {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Ha ocurrido un error al obtener la información',
      })
    });
  }

  onChange(name: any) {
    this.indicators = this.indicatorsSaved;
    this.loading = true;
    setTimeout(() => {
      this.indicators = this.indicators.filter(indicator => indicator.nombre == name)
      this.loading = false;
    }, 500);
    console.log(name)
  }

  clear() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.form.reset();
      this.indicators = this.indicatorsSaved;
    }, 500);
  }

}
