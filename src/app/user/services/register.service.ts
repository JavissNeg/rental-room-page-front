import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    apiUrl = environment.apiUrl;

    constructor(
      private http: HttpClient
    ) { }
	
    registerUser(user: any): Observable<any> {
      return this.http.post(
        `${this.apiUrl}/user/register`, user
      );
    }

}
