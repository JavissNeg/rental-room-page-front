import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LoginGetResponse, LoginPostRequestBody, LoginPostResponse } from '../interfaces/login';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	private apiUrl = environment.apiUrl;
	private LOGIN_ID = 'loginId';
	
	loginSubject = new Subject<boolean>();

	constructor(
		private http: HttpClient
	) { }

	newLogin(login: LoginPostRequestBody): Observable<LoginPostResponse> {
		return this.http.post<LoginPostResponse>(
			`${this.apiUrl}/login`, login
		).pipe(
			catchError((error: any) => {
				return throwError(() => error);
			})
		);
		
	}

	getLoginById(loginId: number): Observable<LoginGetResponse> {
		return this.http.get<LoginGetResponse>(
			`${this.apiUrl}/login/${loginId}`
		).pipe(
			catchError((error: any) => {
				return throwError(() => error);
			})
		);
	}

	updateLoginById(loginId: number, login: LoginPostRequestBody): Observable<LoginGetResponse> {
		return this.http.put<LoginGetResponse>(
			`${this.apiUrl}/login/${loginId}`, login
		).pipe(
			catchError((error: any) => {
				return throwError(() => error);
			})
		);
	}

	deleteLoginById(loginId: number): Observable<LoginGetResponse> {
		return this.http.delete<LoginGetResponse>(
			`${this.apiUrl}/login/${loginId}`
		).pipe(
			catchError((error: any) => {
				return throwError(() => error);
			})
		);
	}

	getAllLogins(): Observable<LoginGetResponse> {
		return this.http.get<LoginGetResponse>(
			`${this.apiUrl}/login`
		).pipe(
			catchError((error: any) => {
				return throwError(() => error);
			})
		);
	}

	getLoginByMail(mail: string): Observable<LoginGetResponse> {
		return this.http.get<LoginGetResponse>(
			`${this.apiUrl}/login/mail/${mail}`
		).pipe(
			catchError((error: any) => {
				return throwError(() => error);
			})
		);
	}

	isLoggedIn(): boolean {
		return !!localStorage.getItem(this.LOGIN_ID);
	}

	getLoginId(): string | null {
		return localStorage.getItem(this.LOGIN_ID);
	}

	login(loginId: string): void {
		localStorage.setItem(this.LOGIN_ID, loginId);
		this.loginSubject.next(true);
	}

	logout(): void {
		localStorage.removeItem(this.LOGIN_ID);
		this.loginSubject.next(false);
	}


}
