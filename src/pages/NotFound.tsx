import type { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function NotFound(): ReactElement {
    return (
        <div className="container page not-found">
            <h1>404 — Page not found</h1>
            <p className="muted">The page you requested does not exist.</p>
            <p>
                <Link to="/">Return home</Link>
            </p>
        </div>
    );
}
