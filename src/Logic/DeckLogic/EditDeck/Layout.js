//import the necessary packages
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeckForm from "../DeckForm";
import { readDeck } from "../../../utils/api";
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
  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, [deckId]);

  if (!deck) return null;
  return (
    <>
      <Navbar deck={deck}/>
      <h1>Edit Deck</h1>
      <DeckForm deck={deck} />
    </>
  );
}

export default EditDeck;
