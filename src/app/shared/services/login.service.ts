import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LoginGetResponse, LoginRequestBody, LoginsGetResponse } from '../interfaces/login';
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

	newLogin(login: LoginRequestBody): Observable<LoginGetResponse> {
		return this.http.post<LoginGetResponse>(
			`${this.apiUrl}/login`, login
		).pipe(
			catchError((error: any) => {
				return throwError(() => error);
			})
		);
		
	}

	setData(data: LoginRequestBody): void {
		localStorage.setItem('data', JSON.stringify(data));
	}

	getData(): LoginRequestBody {
		const data = localStorage.getItem('data');
		if (data) {
			return JSON.parse(data);
		} else {
			return {} as LoginRequestBody;
		}
	}

	deleteData(): void {
		localStorage.removeItem('data');
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

	updateLoginById(loginId: number, login: LoginRequestBody): Observable<LoginGetResponse> {
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

	getAllLogins(): Observable<LoginsGetResponse> {
		return this.http.get<LoginsGetResponse>(
			`${this.apiUrl}/login`
		).pipe(
			catchError((error: any) => {
				return throwError(() => error);
			})
		);
	}

	getLoginByMail(mail: string): Observable<LoginsGetResponse> {
		return this.http.get<LoginsGetResponse>(
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

	getName(): string | null {
		return localStorage.getItem('name');
	}

	login(loginId: string, name: string): void {
		localStorage.setItem(this.LOGIN_ID, loginId);
		localStorage.setItem('name', name);
		this.loginSubject.next(true);
	}

	logout(): void {
		localStorage.removeItem(this.LOGIN_ID);
		localStorage.removeItem('name');
		this.loginSubject.next(false);
	}


}
