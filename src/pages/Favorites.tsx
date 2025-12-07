import type { ReactElement } from "react";
import { useFavorites } from "../hooks/useFavorites";

export default function Favorites(): ReactElement {
    const { favorites } = useFavorites();

    return (
        <div className="container page favorites-page">
            <header className="page-header">
                <h1>Your Favorites</h1>
            </header>

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
        </div>
    );
}
