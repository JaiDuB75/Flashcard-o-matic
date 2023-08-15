//import neccessary properties

import React, { useEffect, useState } from "react";
import { deleteCard, readDeck } from "../../../utils/api"; //provided for me
import { Link, useRouteMatch, useHistory } from "react-router-dom";

//Create the component that passes in a prop called deck
function DisplayCards({ deck }) {
  const { url } = useRouteMatch(); // The useRouteMatch hook attempts to match the current URL in the same way that a <Route> would
  const history = useHistory(); // useHistory accesses the history instance that can be used to navigate the app

  //Set the states to handle cards
  //useState returns an array with two items:
  // 1. Current State: refers to the current state of this state variable, initially set when implementing useState()
  // 2. Set Function: refres to a function that lets you change it to any other value in response to interaction.
  const [cards, setCards] = useState(null);

  //create useEffect to get the cards from the api
  //useEffect passes two arguments:
  // 1. Setup Function: The function with the logic for the Effect
  // 2. List of Dependencies: The list of all reactive values referenced inside of the setup code.
  useEffect(() => {
    async function getCards() {
      const response = await readDeck(deck.id); //create and set response to the given deck id
      setCards(response.cards);
    }
    getCards();
  }, [deck.id]);

  //if there are no cards return null
  if (!cards) return null;

  //return card screen
  return cards.map((card) => {
    //function to handle deletion
    function onDelete(event) {
      if (window.confirm("Confirm Delete")) {
        deleteCard(card.id);
        history.push(`${url}`);//Redirects the user
        setCards((lastCards) => {
          const newCards = lastCards.filter((item) => item.id !== card.id);
          return newCards;
        });
      } else {
        event.target.parentElement.parentElement.style.backgroundColor = "#fff";
        history.push(`${url}`);//Redirects the user
      }
    }

    return (
      <div className="col-sm-6" key={card.id}>
        <div className="card">
          <div className="card-body">
            <p className="card-text">Front: {card.front}</p>

            <p className="card-text">Back: {card.back}</p>
            <div className="d-flex justify-content-end">
              <Link
                to={`${url}/cards/${card.id}/edit`}
                className="btn btn-outline-secondary"
              >
                Edit
              </Link>
              <button
                className="btn btn-danger-outline"
                onMouseDown={(event) =>
                  (event.target.parentElement.parentElement.style.backgroundColor =
                    "#E8eff1")
                }
                onClick={onDelete}
              ></button>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

export default DisplayCards;
