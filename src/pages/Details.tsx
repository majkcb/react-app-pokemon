import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { PokemonDetails } from "../types/pokemon";
import { useFavorites } from "../hooks/useFavorites";

export default function Details(): ReactElement {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isFavorite, toggle } = useFavorites();

    useEffect(() => {
        if (!name) return;

        let isMounted = true;

        const loadPokemon = async () => {
            try {
                if (!isMounted) return;
                setLoading(true);

                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (!res.ok) throw new Error("Could not fetch pokemon");

                const data: PokemonDetails = await res.json();

                if (isMounted) {
                    setPokemon(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(String(err));
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadPokemon();

        return () => {
            isMounted = false;
        };
    }, [name]);

    return (
        <div className="container page details">
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

            {loading && <p>Loading details…</p>}
            {error && <p className="error">Error: {error}</p>}

            {pokemon && (
                <article className="detail-card">
                    <header className="detail-header">
                        <h1>{pokemon.name} <span className="muted">#{pokemon.id}</span></h1>
                        <button className="fav-btn big" onClick={() => toggle(pokemon.name)}>
                            {isFavorite(pokemon.name) ? "★ Favorited" : "☆ Add to favorites"}
                        </button>
                    </header>

                    <div className="detail-body">
                        <img
                            src={pokemon.sprites.front_default ?? ""}
                            alt={pokemon.name}
                            width={150}
                            height={150}
                            style={{ imageRendering: "pixelated" }}
                        />
                        <div className="meta">
                            <p>Weight: {pokemon.weight}</p>
                            <p>Height: {pokemon.height}</p>
                            <p>
                                Types: {pokemon.types.map(t => t.type.name).join(", ")}
                            </p>
                            <p>
                                Abilities: {pokemon.abilities.map(a => a.ability.name).join(", ")}
                            </p>
                        </div>
                    </div>
                </article>
            )}
        </div>
    );
}
