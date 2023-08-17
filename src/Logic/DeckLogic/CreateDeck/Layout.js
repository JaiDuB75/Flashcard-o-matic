//import the necessary packages

import React from "react";
import DeckForm from "../DeckForm";
import Navbar from "./Navbar";

function CreateDeck(){
    return(
        <>

            <Navbar/>
            <h1>
                Create Deck
            </h1>
            <DeckForm />
        </>
    );
}

export default CreateDeck;