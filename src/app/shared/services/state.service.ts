import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { StateResponse } from '../interfaces/state';

@Injectable({
  providedIn: 'root'
})
export class StateService {

	private apiUrl = environment.apiUrl;

	constructor(
		private http: HttpClient
	) { }

	getStates() : Observable<StateResponse>{
		return this.http.get<StateResponse>(`${this.apiUrl}/state`)
			.pipe(
				catchError((error) => {
					return throwError(() => error);
				})
			);
	}

}
