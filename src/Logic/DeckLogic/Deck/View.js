//import the necessary packages
import React, { useState, useEffect } from "react";
import { Link, useHistory, useRouteMatch, useParams } from "react-router-dom";
import { deleteDeck, readDeck } from "../../../utils/api"; //Provided for me.
import DisplayCards from "./DisplayCards";

//Create the View Component

function View() {
  //Variables for history, url, and deskId

  //useHistory lets you access the history instance used by React Router.
  //Using the history instance you can redirect users to another page.
  //Accessing the history instance created by React
  const history = useHistory();

  //useRouteMatch returns a match object that contains all the information like how the current URL matched with the Route path.

  const { url } = useRouteMatch();

  // Using useParams allows us to use the params from the URL/Route
  // We need access to the deckId
  const { deckId } = useParams();

  //Set the state for deck
  //useState returns an array with two items:
  // 1. Current State: refers to the current state of this state variable, initially set when implementing useState()
  // 2. Set Function: refres to a function that lets you change it to any other value in response to interaction.
  const [deck, setDeck] = useState(null);

  //Create a useEffect to load the Deck from the API
  useEffect(() => {
    async function getDecks() {
      const response = await readDeck(deckId); // get the deck that matched the fiven deck id
      setDeck(response); // set the selected deck
    }
    getDecks();
  }, [deckId]);

  //if there is no deck return null;
  if (!deck) return null;
  //return the screen for the view
  return (
    <>
      <div className="col-sm-12">
        <div className="card" style={{ border: "none" }}>
          <div className="card-body">
            <h4 className="card-title">{deck.name}</h4>
            <p className="card-text">{deck.description}</p>
            <div className="d-flex justify-content-between">
              <div>
                <Link to={`${url}/edit`} className="btn btn-outline-secondary">
                  Edit Deck
                </Link>
                <Link to={`${url}/study`} className="btn btn-outline-secondary">
                  Study Deck
                </Link>
                <Link
                  to={`${url}/cards/new`}
                  className="btn btn-outline-primary"
                >
                  Add to the Deck
                </Link>
              </div>
              <div>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (window.confirm("Confirm Deck Deletion")) {
                      deleteDeck(deck.id);
                      history.push("/");
                    } else {
                      history.push(`${url}`); //redirects the user
                    }
                  }
                }>
                  Delete Deck
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h5>{deck.name} Cards</h5>
      </div>
      <DisplayCards deck={deck} />
    </>
  );
}

export default View;
