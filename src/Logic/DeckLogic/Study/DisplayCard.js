//import the necessary packages

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NotEnoughCards from "./NotEnoughCards";

function DisplayCard({ deck }) {
  // useHistory accesses the history instance that can be used to navigate the app
  const history = useHistory();

  //set up th use states to handle edit, name, description
  //useState returns an array with two items:
  // 1. Current State: refers to the current state of this state variable, initially set when implementing useState()
  // 2. Set Function: refres to a function that lets you change it to any other value in response to interaction.
  const [card, setCard] = useState(0);
  const [side, setSide] = useState(true);

  //Create a variable to hold the cards from the given deck
  const allCards = deck.cards;

  //Create a function to handle the card flip
  function onFlip() {
    setSide(!side);
  }

  //Create a function to handle moving to the next card
  function Next() {
    setCard((prevCard) => prevCard + 1);
    setSide(true); //Sets the correct side when moving to the next card
    if (card === allCards.length - 1) {
      return window.confirm("Start Over?") ? setCard(0) : history.push("/");
    }
  }

  function Previous() {
    setCard((prevCard) => prevCard - 1);
    setSide(true); //Sets the correct side when moving to the previous card
  }

    if(allCards.length < 3){
        return <NotEnoughCards allCards={allCards}/>
    }

  //Return the screen for Study
  return (
    <div className="row py-2 d-flex justify-content-center">
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card: {card + 1} of {allCards.length}
            </h5>
            <p className="card-text">
              {side ? allCards[card].front : allCards[card].back}
            </p>
            {card >= 1 ? (
              <button
                id="previous"
                className="btn btn-primary-outline"
                onClick={Previous}
              >
                Previous
              </button>
            ) : null}
            <button
              className="btn btn-secondary-outline mx-2"
              onClick={onFlip}
            >
              Flip
            </button>
            {!side ? (
              <button className="btn btn-primary-outline" onClick={Next}>
                Next
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;
