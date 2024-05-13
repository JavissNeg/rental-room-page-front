export interface Country {
    country_id: number
    country: string
    created_at: string
    updated_at: string
}

export interface  ResponseGetCountry {
    message: string
    data: Country[]
    status: number
}
