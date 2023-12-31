import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import { readDeck } from "../../../utils/api";

function Navbar(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState(null);

    useEffect(() => {
        async function getDeck(){
            const response = await readDeck(deckId);
            setDeck(response);
        } 
        getDeck();
    }, [deckId]);

    if(!deck) return null;
    return(
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="breadcrumb-item active">
                    {deck.name}
                </li>
            </ol>
        </nav>
    );
}

export default Navbar;