//import the necessary packages
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
//import DeckForm from "../DeckForm";
import { readDeck, updateDeck } from "../../../utils/api";
import Navbar from "./Navbar";

function EditDeck() {
  // Using useParams allows us to use the params from the URL/Route
  // We need access to the deckId
  const { deckId } = useParams();

  //useState returns an array with two items:
  // 1. Current State: refers to the current state of this state variable, initially set when implementing useState()
  // 2. Set Function: refres to a function that lets you change it to any other value in response to interaction.
  const [deck, setDeck] = useState(null);

  //create useEffect to get the decks from the api
  //useEffect passes two arguments:
  // 1. Setup Function: The function with the logic for the Effect
  // 2. List of Dependencies: The list of all reactive values referenced inside of the setup code.
/*   useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, [deckId]); */

  const history = useHistory(); 

  useEffect(() => {
    async function getDeck(){
      const abortController = new AbortController();
      try{
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      }catch(error){
        console.error("An Error has occured", error);
      };
    }
    getDeck();
  }, [deckId]);

  function onChange({target}){
    setDeck({...deck, [target.name]: target.value,
    });
  }

  async function onSubmit(event) {
    event.preventDefault(); //Prevents the webpage from executing a cancelable event 
    const abortController = new AbortController();
    const response = await updateDeck({...deck}, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  } 

  function onCancel(){
    history.push(`/decks/${deckId}`);
  }

  if (!deck) return null;
  return (
    <>
      <Navbar deck={deck}/>

      <form onSubmit={onSubmit}>
          <h1>Edit Deck</h1>
          <h4>{deck.name}</h4>
          <div className="form-group">
            <input 
              id="name"
              name="name"
              className="form-control"
              onChange={onChange}
              placeholder="Enter Name Here"
              value={deck.name}
            />
          </div>
          <div className="form-group">
            <textarea
              id="description"
              name="description"
              className="form-control"
              onChange={onChange}
              placeholder="Enter Description Here"
              value={deck.description}
            />
          </div>
          <button className="btn btn-outline-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-outline-primary" type="submit">
            Submit
          </button>
      </form>
      {/* <DeckForm deck={deck} /> */}
    </>
  );
}

export default EditDeck;
