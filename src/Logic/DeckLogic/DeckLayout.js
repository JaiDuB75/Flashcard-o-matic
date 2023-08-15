//import the neccessary properties

import React from "react";
import {Switch, Route} from "react-router-dom";
import CreateDeck from "./CreateDeck/Layout";
import Deck from "./Deck/Layout";

function Decks(){
    return (
        <Switch>
            <Route path="/decks/new">
                <CreateDeck/>
            </Route>
            <Route path="/decks/:deckId">
                <Deck/>
            </Route>
        </Switch>
    );
}

export default Decks;