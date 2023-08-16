//import necessary functions

import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { createDeck, updateDeck, listDecks } from "../../utils/api/index"; //Provided for me.

function DeckForm({ deck }) {
  //Create the DeckForm take takes in a deck prop

  const history = useHistory(); // useHistory accesses the history instance that can be used to navigate the app
  const { pathname } = useLocation(); // useLocation returns the location object that represnts the current URL. Helps trigger the new page view

  //set up th use states to handle edit, name, description
  //useState returns an array with two items:
  // 1. Current State: refers to the current state of this state variable, initially set when implementing useState()
  // 2. Set Function: refres to a function that lets you change it to any other value in response to interaction.
  const [isEdit, setIsEdit] = useState(true);
  const [name, setName] = useState({ "name": "" }); //use an object to update the name object later in the app
  const [description, setDescription] = useState({ "description": "" }); //use an object to update the description object later in the app

  //Add useEffect to edit
  //useEffect passes two arguments:
  // 1. Setup Function: The function with the logic for the Effect
  // 2. List of Dependencies: The list of all reactive values referenced inside of the setup code.
  useEffect(() => {
    //Function that determines if to add or edit the deck
    function addOrEdit() {
      if (pathname.includes("edit")) {
        //if the location/path includes edit
        //set Name to the prop deck name
        setName({ "name": deck.name });
        //set Description to prop deck description
        setDescription({ "description": deck.description });
      } else {
        //set isEdit to False
        setIsEdit(false);
      }
    }

    addOrEdit();
  }, [deck, pathname]);

  //Create a function to handle name
  function handleName(event) {
    setName({
      ...name, // passes the previous names
      "name": event.target.value,
    }); // Sets the name of the new deck
  }
  //Create a function to handle description
  function handleDescription(event) {
    setDescription({ ...description, "description": event.target.value });
  }

  //Create a function to handle Creation
  async function onCreate() {
    await createDeck({ ...name, ...description }); //await the information from create deck
    const response = await listDecks(); //set the response to the provided listDecks
    const newDeckId = Math.max(...response.map(deck => deck.id)); //gives the new deck it's id
    history.push(`/decks/${newDeckId}`); //Redirects the user to the new deck using the new deck Id
  }

  //Create a function to handle update
  function onUpdate() {
    updateDeck({ "id": deck.id, ...name, ...description }); //run update from the provided index
    history.push(`/decks/${deck.id}`); //Redirects the user to the updated deckes page
  }

  //return the screen for DeckFrom
  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name.name || ""}
            placeholder={isEdit ? null : "Deck Name"}
            onChange={handleName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description.description || ""}
            placeholder={isEdit ? null : "Deck Description"}
            onChange={handleDescription}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => history.push(isEdit ? `/decks/${deck.id}` : "/")}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={isEdit ? onUpdate : onCreate}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default DeckForm;
