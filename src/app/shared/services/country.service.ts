import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Country, ResponseGetCountry } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    getCountries(): Observable<ResponseGetCountry> {
        return this.http.get<ResponseGetCountry>(`${this.apiUrl}/country`)
            .pipe(
                catchError((error) => {
                    return throwError(() => error);
                })
            );
    }
}
