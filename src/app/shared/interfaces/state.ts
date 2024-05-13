import { Country } from "./country"

export interface State {
    state_id: number
    state: string
    country_id: string
    created_at: string
    updated_at: string
    country: Country
}

export interface States {
    state_id: number
    state: string
    country_id: string
    created_at: string
    updated_at: string
}

export interface StateResponse {
    status: number
    data: States[]
    message: string
}
  
