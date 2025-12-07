import { Link } from "react-router-dom";
import type { ReactElement } from "react";

export default function Navbar(): ReactElement {
    return (
        <header className="navbar">
            <div className="container navbar-inner">
                <Link to="/" className="brand">PokéSearch</Link>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/favorites" style={{ marginLeft: 12 }}>Favorites</Link>
                </nav>
            </div>
        </header>
    );
}
