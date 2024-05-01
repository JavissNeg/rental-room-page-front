export interface PaymentRequestPurchase {
    amount: number;
    currencyCode: string;
    returnUrl: string;
    cancelUrl: string;
}

export interface Payment {
    payment_id: string;
    redirect_url: string;
}

export interface PaymentGetResponse {
    status: number;
    data: Payment;
    message: string;
}
