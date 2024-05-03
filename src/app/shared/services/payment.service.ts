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
    private frontUrl: string = environment.frontUrl;

    constructor(
        private http: HttpClient
    ) { }
    
    purchasePayment(data: PaymentRequestPurchase): Observable<PaymentGetResponse> {
        data.cancelUrl = `${this.frontUrl}/property/detail`;
        data.returnUrl = `${this.frontUrl}/property/detail`;
        
        return this.http.post<PaymentGetResponse>(`${this.apiUrl}/payment`, data)
            .pipe(
                catchError((error: any) => {
                    return throwError(error);
                })
            );
    }
}
