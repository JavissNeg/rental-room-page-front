import { Country } from "./country"

export interface State {
    state_id: number
    state: string
    country_id: string
    created_at: string
    updated_at: string
    country: Country
}
