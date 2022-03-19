import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {

  constructor(
    private _http: HttpClient
  ) { }

  getIndicators() {
    return this._http.get('https://mindicador.cl/api');
  }

  getIndicatorType(indicatorType: String): Observable<any> {
    return this._http.get(`https://mindicador.cl/api/${indicatorType}`);
  }
}
