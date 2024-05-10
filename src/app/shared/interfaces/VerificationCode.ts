export interface VerificationCodeRequestBody {
    mail: string;
    code?: string;
}

interface VerificationCode {
    verification_code_id?: number;
    mail: string;
    code: string;
    expires_at: string;
    createdAt: string; 
    updatedAt?: string; 
}


export interface VerificationCodeResponse {
    status: number;
    message: string;
    data: VerificationCode;
}