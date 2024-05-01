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

}
