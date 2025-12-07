import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

type Props = {
    name: string;
    onToggleFav: (name: string) => void;
    isFavorite: boolean;
};

export default function PokemonCard({ name, onToggleFav, isFavorite }: Props) {
    return (
        <article className="card">
            <div className="card-header">
                <h3 className="card-title">
                    <Link to={`/pokemon/${name}`}>{name}</Link>
                </h3>
                <FavoriteButton isFav={isFavorite} onClick={() => onToggleFav(name)} />
            </div>
            <p className="muted">Click for details</p>
        </article>
    );
}
