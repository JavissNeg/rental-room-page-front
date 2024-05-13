import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CityGetResponse } from '../interfaces/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    getCities() : Observable<CityGetResponse> {
        return this.http.get<CityGetResponse>(`${this.apiUrl}/city`)
            .pipe(
                catchError( (error: any) => {
                    return throwError(() => error);
                })
            );
    }
}
