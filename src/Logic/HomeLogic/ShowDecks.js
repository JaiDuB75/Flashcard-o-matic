import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api";

function ShowDecks() {
  //Set the state for deck
  //useState returns an array with two items:
  // 1. Current State: refers to the current state of this state variable, initially set when implementing useState()
  // 2. Set Function: refres to a function that lets you change it to any other value in response to interaction.
  const [decks, setDecks] = useState([]);

  // Create an useEffect to get the Decks
  //useEffect passes two arguments:
  // 1. Setup Function: The function with the logic for the Effect
  // 2. List of Dependencies: The list of all reactive values referenced inside of the setup code.

  useEffect(() => {
    async function getDecks() {
      const response = await listDecks();
      setDecks(response);
    }
    getDecks();
  }, []);

  const history = useHistory();

  //Create a card listing for each deck
  const deckListing = decks.map((deck) => {
    const cards = deck.cards;

    function onDelete(event) {
      if (window.confirm("Confirm Delete Deck")) {
        deleteDeck(deck.id);
        setDecks((previousDeck) => {
          const newDeck = previousDeck.filter((item) => item.id !== deck.id);
          return newDeck;
        });
      } else {
        event.target.parentElement.parentElement.parentElement.style.backgroundColor =
          "#fff";
        history.push("/");
      }
    }

    return (
      <div className="col-sm-6" key={deck.id}>
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{deck.name}</h5>
              <p>{cards.length} cards</p>
            </div>
            <p className="card-text">{deck.description}</p>
            <div className="d-flex justify-content-between">
              <div>
                <Link
                  to={`/decks/${deck.id}`}
                  className="btn btn-outline-secondary mr-1"
                >
                  View Deck
                </Link>
                <Link
                  to={`/decks/${deck.id}/study`}
                  className="btn btn-outline-primary"
                >
                  Study Deck
                </Link>
              </div>
              <div>
                <button
                  className="btn btn-outline-danger"
                  onMouseDown={(event) =>
                    (event.target.parentElement.parentElement.parentElement.style.backgroundColor =
                      "#E8eff1")
                  }
                  onClick={onDelete}
                >
                  Delete Deck
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <div className="row">{deckListing}</div>;
}

export default ShowDecks;
