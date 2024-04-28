export interface Property {
    property_id?: number;
    name: string;
    description: string;
    bedrooms_number: string;
    bathrooms_number: string;
    image_url: string;
    price: number;
    isVerified?: boolean;
    isAvaible?: boolean;
    rating: number | null;
    lessor_id: number;
    address_id?: number;
    property_type_id: number;
    currency_id: number;
    period_id: number;
    created_at?: string | null;
    updated_at: string | null;
}

export interface GetPropertyResponse {
    status: number;
    data: Property[] | Property;
    message?: string;
}
