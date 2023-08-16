import React from "react";
import {Link} from "react-router-dom";

function CreateDeckButton(){
    return(
        <div className="row">
            <div className="col-sm-6">
                <Link to="/decks/new" className="btn btn-outline-primary">Create a New Deck</Link>
            </div>
        </div>
    );
}

export default CreateDeckButton; 