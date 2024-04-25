export interface Person {
    person_id: number;
    national_id_image: string;
    first_name: string;
    paternal_surname: string;
    maternal_surname: string;
    mail: string;
    phone?: string; 
    address_id: number;
    created_at: Date;
    updated_at?: Date; 
}
