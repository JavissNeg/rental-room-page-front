export interface LoginPostRequestBody {
    national_id_image?: string;
    first_name: string;
    paternal_surname: string;
    maternal_surname: string;
    mail: string;
    phone?: string;
    password: string; 
    isVerified: boolean;
    isCertified: boolean;
    address_id?: number;
    createdAt?: Date; 
    updatedAt?: Date; 
}


export interface LoginResponse {
    login_Id: number;
    national_id_image: string|null;
    first_name: string;
    paternal_surname: string;
    maternal_surname: string;
    mail: string;
    phone: string;
    password: string; 
    isVerified: boolean;
    isCertified: boolean;
    address_id: number;
    createdAt: Date; 
    updatedAt?: Date; 
}

export interface LoginGetResponse {
    status: number;
    data: LoginResponse[];
    message: string;
}

export interface LoginPostResponse {
    status: number;
    data: LoginResponse;
    message: string;
}
