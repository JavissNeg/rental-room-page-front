import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { PaymentGetResponse, PaymentRequestPurchase } from '../interfaces/payment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

    private apiUrl: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }
    
    purchasePayment(data: PaymentRequestPurchase): Observable<PaymentGetResponse> {
        return this.http.post<PaymentGetResponse>(`${this.apiUrl}/payment`, data)
            .pipe(
                catchError((error: any) => {
                    return throwError(error);
                })
            );
    }
}
