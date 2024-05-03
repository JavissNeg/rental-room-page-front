export interface PaymentRequestPurchase {
    amount: number;
    currencyCode: string;
    returnUrl: string;
    cancelUrl: string;
    payment_type: string;
    property_id: number;
    lessee_id: number | null;
}

export interface Payment {
    payment_id?: string
    payment_key: string
    payment_type: string
    amount: number
    property_id: number
    lessee_id: number
    updated_at?: string
    created_at?: string
    redirect_url?: string
}

export interface PaymentGetResponse {
    status: number;
    data: Payment;
    message: string;
}
