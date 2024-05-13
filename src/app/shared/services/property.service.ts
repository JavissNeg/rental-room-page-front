import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pipe, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { PropertyGetResponse } from '../interfaces/property';

@Injectable({
	providedIn: 'root'
})
	
export class PropertyService {

	private apiUrl: string = environment.apiUrl
	
	constructor(
		private httpClien: HttpClient
	) { }

	
	getProperties(): Observable<PropertyGetResponse> {
		return this.httpClien.get<PropertyGetResponse>(`${this.apiUrl}/property`)
			.pipe(
				catchError( (error: any) => {
					return throwError(() => error);
				})
			);
	}	


	getPropertyById(id: string): Observable<PropertyGetResponse> {
		return this.httpClien.get<PropertyGetResponse>(`${this.apiUrl}/property/${id}`)
			.pipe(
				catchError( (error: any) => {
					return throwError(() => error);
				})
			);
	}

	getPropertyByName(name: string): Observable<PropertyGetResponse> {
		return this.httpClien.get<PropertyGetResponse>(`${this.apiUrl}/property/name/${name}`)
			.pipe(
				catchError( (error: any) => {
					return throwError(() => error);
				})
			);
	}

	getPropertyByCity(city_id: string): Observable<PropertyGetResponse> {
		return this.httpClien.get<PropertyGetResponse>(`${this.apiUrl}/property/city/${city_id}`)
			.pipe(
				catchError( (error: any) => {
					return throwError(() => error);
				})
			);
	}

	getPropertyByState(state_id: number) : Observable<PropertyGetResponse> {
		return this.httpClien.get<PropertyGetResponse>(`${this.apiUrl}/property/state/${state_id}`)
			.pipe(
				catchError( (error: any) => {
					return throwError(() => error);
				})
			);
	}

	getPropertyByCountry(country_id: number): Observable<PropertyGetResponse> {
		return this.httpClien.get<PropertyGetResponse>(`${this.apiUrl}/property/country/${country_id}`)
			.pipe(
				catchError( (error: any) => {
					return throwError(() => error);
				})
			);
	}
	

}
