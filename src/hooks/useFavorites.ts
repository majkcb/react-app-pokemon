import { useEffect, useState } from "react";

const STORAGE_KEY = "pokemon_favorites_v1";

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        } catch {
            // TODO handle error
        }
    }, [favorites]);

    function toggle(name: string) {
        setFavorites((prev) =>
            prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
        );
    }

    function isFavorite(name: string) {
        return favorites.includes(name);
    }

    return {
        favorites,
        toggle,
        isFavorite,
    };
}
