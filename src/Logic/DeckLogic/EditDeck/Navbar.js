import React from "react";
import {Link} from "react-router-dom";

function Navbar({deck}){
    return(
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deck.id}`}>
                        {deck.name}
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Edit Deck
                </li>

            </ol>

        </nav>
    );
}

export default Navbar;