//import the necessary packages

import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { createCard, updateCard, readCard } from "../../utils/api"; // Provided for me

function CardForm({ deck }) {
  //useHistory lets you access the history instance used by React Router.
  //Using the history instance you can redirect users to another page.
  //Accessing the history instance created by React

  const history = useHistory();

  // Using useParams allows us to use the params from the URL/Route
  // We need access to the cardId and deckId
  const { cardId, deckId } = useParams();

  // useLocation returns the location object that represnts the current URL. Helps trigger the new page view
  const { pathname } = useLocation();

  //useState returns an array with two items:
  // 1. Current State: refers to the current state of this state variable, initially set when implementing useState()
  // 2. Set Function: refres to a function that lets you change it to any other value in response to interaction.
  const [isEdit, setIsEdit] = useState(null);
  const [front, setFront] = useState({ front: "" });
  const [back, setBack] = useState({ back: "" });

  //Create a useEffect to read cards
  // and handle edit
  useEffect(() => {
    async function getCard() {
      const response = await readCard(cardId);
      setFront({ front: response.front });
      setBack({ back: response.back });
    }
    function addOrEdit() {
      if (pathname.includes("new")) {
        setIsEdit(false);
      } else {
        setIsEdit(true);
        getCard();
      }
    }
    addOrEdit();
  }, [pathname, cardId]);

  function handleFront(event) {
    setFront({ ...front, "front": event.target.value });
  }

  function handleBack(event) {
    setBack({ ...back, "back": event.target.value });
  }

  function handleCancelAndDone() {
    history.push(`/decks/${deckId}`);
  }

  function onUpdate() {
    updateCard({ id: cardId, deckId: deck.id, ...front, ...back });
    history.push(`/decks/${deck.id}`);
  }

  function onSave() {
    createCard(parseInt(deckId), { ...front, ...back });
    setFront({ "front": "" });
    setBack({ "back": "" });
  }

  if (!front || !back) return null;
  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="front">Front:</label>
          <textarea
            className="form-control"
            id="front"
            rows="3"
            placeholder={isEdit ? null : "Front side of card"}
            value={front.front}
            onChange={handleFront}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back:</label>
          <textarea
            className="form-control"
            id="back"
            rows="3"
            placeholder={isEdit ? null : "Back side of card"}
            value={back.back}
            onChange={handleBack}
          ></textarea>
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleCancelAndDone}
        >
          {isEdit ? "Cancel" : "Done"}
        </button>

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={isEdit ? onUpdate : onSave}
        >
          Save
        </button>
      </form>
    </>
  );
}

export default CardForm;
