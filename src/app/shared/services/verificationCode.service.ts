import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { VerificationCodeRequestBody, VerificationCodeResponse } from '../interfaces/VerificationCode';

@Injectable({
    providedIn: 'root'
})

export class VerificationCodeService {

    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) { }


    newCode(data: VerificationCodeRequestBody): Observable<VerificationCodeResponse> {
        return this.http.post<VerificationCodeResponse>(`${this.apiUrl}/verificationCode`, data)
            .pipe(
                catchError( (error: any) => {
                        return throwError(() => error);
                })
            );
    }


    isAvailable(mail: string): Observable<VerificationCodeResponse> {
        return this.http.get<VerificationCodeResponse>(`${this.apiUrl}/verificationCode/available/${mail}`)
            .pipe(
                catchError( (error: any) => {
                        return throwError(() => error);
                })
            );
    }

}
