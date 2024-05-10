export interface MailRequestBody {
    type: string;
    mail: string;
    verification_code?: string;
    addressee: string;
}

export interface MailResponse {
    status: number;
    data: MailRequestBody;
    message: string;
}
