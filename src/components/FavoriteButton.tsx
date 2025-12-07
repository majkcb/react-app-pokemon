type Props = {
    isFav: boolean;
    onClick: () => void;
};

export default function FavoriteButton({ isFav, onClick }: Props) {
    return (
        <button className={`fav-btn ${isFav ? "fav" : ""}`} onClick={onClick} aria-pressed={isFav}>
            {isFav ? "★" : "☆"}
        </button>
    );
}
