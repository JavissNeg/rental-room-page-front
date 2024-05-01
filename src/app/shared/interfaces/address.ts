import { City } from "./city"

export interface Address {
    address_id: number
    location?: any
    street: string
    district: string
    zip_code: string
    street_number: string
    apartment_number?: string
    city_id: string
    created_at: string
    updated_at?: string
    city: City
}
