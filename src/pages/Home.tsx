import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import type { PokemonListResponse } from "../types/pokemon";
import PokemonCard from "../components/PokemonCard";
import { useFavorites } from "../hooks/useFavorites";

export default function Home(): ReactElement {
    const [list, setList] = useState<string[]>([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { favorites, toggle, isFavorite } = useFavorites();

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            try {
                if (!isMounted) return;
                setLoading(true);

                const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40");
                if (!res.ok) throw new Error("Network response not ok");

                const data: PokemonListResponse = await res.json();

                if (isMounted) {
                    setList(data.results.map((r) => r.name));
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

        load();

        return () => {
            isMounted = false;
        };
    }, []);


    return (
        <div className="container page home">
            <header className="page-header">
                <h1>Pokémon</h1>
                <p className="muted">List — mark favorites. Saved in your browser.</p>
            </header>

            <div className="controls">
                <label htmlFor="search" className="muted">Search</label>
                <input
                    id="search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Filter by name"
                />
            </div>

            {loading && <p>Loading Pokémon…</p>}
            {error && <p className="error">Error: {error}</p>}

            <section className="grid">
                {list
                    .filter((n) => n.toLowerCase().includes(query.toLowerCase()))
                    .map((name) => (
                        <PokemonCard
                            key={name}
                            name={name}
                            onToggleFav={() => toggle(name)}
                            isFavorite={isFavorite(name)}
                        />
                    ))}
            </section>

            <section className="favorites">
                <h2>Your favorites</h2>
                {favorites.length === 0 ? (
                    <p className="muted">No favorites yet</p>
                ) : (
                    <ul className="fav-list">
                        {favorites.map((f) => (
                            <li key={f}>
                                <a href={`/pokemon/${f}`}>{f}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
