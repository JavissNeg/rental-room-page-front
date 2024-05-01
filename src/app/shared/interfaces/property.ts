import { Address } from "src/app/shared/interfaces/address"
import { PropertyType } from "src/app/shared/interfaces/property-type"
import { Currency } from "src/app/shared/interfaces/currency"
import { Period } from "src/app/shared/interfaces/period"

export interface Property {
    property_id: number
    name: string
    description: string
    bedrooms_number: string
    bathrooms_number: string
    image_url: string[]
    price: string
    isVerified: string
    isAvaible: string
    rating: number;
    lessor_id: string
    address_id: string
    property_type_id: string
    currency_id: string
    period_id: string
    created_at: any
    updated_at: any
    login: Login
    address: Address
    property_type: PropertyType
    currency: Currency
    period: Period
}


export interface PropertyGetResponse {
    status: number
    data?: Property[] | Property
    message: string
}


interface Login {
    login_id: number
    first_name: string
    paternal_surname: string
    maternal_surname: string
    mail: string
    phone: string
  }