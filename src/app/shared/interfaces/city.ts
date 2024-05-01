import { State } from "./state"

export interface City {
    city_id: number
    city: string
    state_id: string
    created_at: string
    updated_at: string
    state: State
}
