//import necessary packages

import React from "react";
import { Link, useParams } from "react-router-dom";

function NotEnoughCards({ allCards }) {
  // Using useParams allows us to use the params from the URL/Route
  // We need access to the deckId
  const { deckId } = useParams();

  return (
    <>
    <div style={{textAlign:"center"}}>
    <h3 style={{textAlign:"center"}}>There are not enough Cards in the Deck</h3>
      <p style={{textAlign:"center"}}>
        There needs to at least 3 cards in the deck to study. There are:{" "}
        {allCards.length} cards in this deck
      </p>
      <Link
        to={`/decks/${deckId}/cards/new`}
        type="button"
        className="btn btn-outline-primary"
      >
        Add Cards to Deck
      </Link>
    </div>
    </>
  );
}

export default NotEnoughCards;
