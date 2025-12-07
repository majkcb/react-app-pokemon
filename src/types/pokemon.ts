export interface PokemonListResult {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListResult[];
}

export interface PokemonAbility {
    ability: { name: string; url: string };
    slot: number;
}

export interface PokemonType {
    slot: number;
    type: { name: string; url: string };
}

export interface PokemonSprites {
    front_default: string | null;
    other?: Record<string, unknown>;
}

export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: PokemonSprites;
    abilities: PokemonAbility[];
    types: PokemonType[];
}
