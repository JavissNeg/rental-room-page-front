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
    createdAt?: string; 
    updatedAt?: string; 
}


export interface Login {
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
    createdAt: string; 
    updatedAt?: string; 
}

export interface LoginGetResponse {
    status: number;
    data: Login[];
    message: string;
}

export interface LoginPostResponse {
    status: number;
    data: Login;
    message: string;
}
