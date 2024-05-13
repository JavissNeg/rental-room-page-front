import { State } from "./state"

export interface City {
    city_id: number
    city: string
    state_id: string
    created_at: string
    updated_at: string
    state: State
}

export interface Cities {
    city_id: number
    city: string
    state_id: string
    created_at: string
    updated_at: string
}

export interface CityGetResponse {
    status: number
    data: Cities[]
    message: string
}
