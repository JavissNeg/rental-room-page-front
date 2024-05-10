import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { MailRequestBody, MailResponse } from '../interfaces/mail';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

	private apiUrl = environment.apiUrl;
	private VERIFY_MAIL: string	 = 'verifyMail';
	private COMPLETE_REGISTRATION: string	 = 'completeRegistration';

	constructor(
		private http: HttpClient,
	) { }

	sendMailVerification(data: MailRequestBody): Observable<MailResponse> {
		data.type = this.VERIFY_MAIL;
		
		return this.http.post<MailResponse>(`${this.apiUrl}/mail`, data)
			.pipe(
				catchError( (err) => {
					return throwError(err) ;
				})
			);
	}

	sendCompleteRegistration(data: MailRequestBody): Observable<MailResponse> {
		data.type = this.COMPLETE_REGISTRATION;
		
		return this.http.post<MailResponse>(`${this.apiUrl}/mail`, data)
			.pipe(
				catchError( (err) => {
					return throwError(err) ;
				})
			);
	}
}
